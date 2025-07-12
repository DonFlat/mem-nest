# Full Stack Hello World

This project provides a minimal Rust backend and a simple frontend written in
TypeScript. You can upload an Excel spreadsheet and the contents of its first
sheet will be displayed in a table.

## Features
- **Backend**: Actix-web server exposing `/api/hello` and `/api/upload` endpoints while serving static files from `public/`.
- **Frontend**: Static page fetching the hello message and allowing Excel uploads.

## Getting Started

1. Install Node.js dependencies for TypeScript compilation (requires Node.js and npm):
   ```bash
   npm install
   ```
2. (Optional) Compile TypeScript if you modify files in `src/`:
   ```bash
   npx tsc
   ```
3. Run the Rust server (requires Rust toolchain):
   ```bash
   cargo run --manifest-path server/Cargo.toml
   ```
4. Visit `http://localhost:3000` in your browser.
5. Use the upload form to select an `.xlsx` file and view the data.
