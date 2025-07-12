use actix_files as fs;
use actix_web::{get, post, App, HttpServer, HttpResponse, Responder};
use actix_multipart::Multipart;
use futures_util::StreamExt as _;
use actix_web::web::BytesMut;
use calamine::{open_workbook_auto, Reader};

#[get("/api/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({"message": "Hello, world!"}))
}

#[post("/api/upload")]
async fn upload(mut payload: Multipart) -> actix_web::Result<HttpResponse> {
    let mut bytes = BytesMut::new();
    while let Some(field) = payload.next().await {
        let mut field = field?;
        while let Some(chunk) = field.next().await {
            let data = chunk?;
            bytes.extend_from_slice(&data);
        }
    }

    let cursor = std::io::Cursor::new(bytes.to_vec());
    let mut workbook = open_workbook_auto(cursor).map_err(|e| {
        actix_web::error::ErrorBadRequest(format!("Failed to read workbook: {}", e))
    })?;

    let sheet_name = workbook
        .sheet_names()
        .get(0)
        .cloned()
        .ok_or_else(|| actix_web::error::ErrorBadRequest("No sheets found"))?;

    let range = workbook
        .worksheet_range(&sheet_name)
        .ok_or_else(|| actix_web::error::ErrorBadRequest("Cannot find sheet"))?
        .map_err(|e| actix_web::error::ErrorBadRequest(e.to_string()))?;

    let data: Vec<Vec<String>> = range
        .rows()
        .map(|row| row.iter().map(|c| c.to_string()).collect())
        .collect();

    Ok(HttpResponse::Ok().json(data))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(upload)
            .service(fs::Files::new("/", "public").index_file("index.html"))
    })
    .bind(("0.0.0.0", 3000))?
    .run()
    .await
}
