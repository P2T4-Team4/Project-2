import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./config/connection.js";
import routes from "./routes/index.js";
import bookRoutes from "./routes/bookRoutes.js";
import { searchBooks } from "./Controllers/SearchController.js";
import { getBooksForHomepage } from "./Controllers/bookController.js";

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Utilities to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Middleware ===
app.use(express.json());

// === API Routes ===
app.use("/api/books", bookRoutes);               
app.get("/api/search", searchBooks);             
app.get("/home", getBooksForHomepage);       

// === Use Additional Routes if needed ===
app.use(routes); // Only if routes/index.js exists and is needed

// === Serve frontend (only after API routes) ===
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// === Catch-all: Serve index.html for React Router ===
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// === Start Server ===
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
