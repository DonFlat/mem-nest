# Full Stack Hello World

This project provides a minimal Rust backend and a simple frontend written in
TypeScript.

## Features
- **Backend**: Actix-web server exposing `/api/hello` and serving static files from `public/`.
- **Frontend**: Static page fetching the hello message.

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
