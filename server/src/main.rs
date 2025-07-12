use actix_files as fs;
use actix_web::{get, App, HttpServer, HttpResponse, Responder};

#[get("/api/hello")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({"message": "Hello, world!"}))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello)
            .service(fs::Files::new("/", "public").index_file("index.html"))
    })
    .bind(("0.0.0.0", 3000))?
    .run()
    .await
}
