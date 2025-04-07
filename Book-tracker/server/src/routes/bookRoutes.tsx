import express from "express";
import { getBooksForHomepage } from "../Controllers/bookController.js";
import { searchBooks } from "../Controllers/SearchController.js"; // Adjust the import path as necessary
import Book from "../models/book.js"; // Adjust the import path as necessary
const router = express.Router();

router.get("/", searchBooks); // Search for books using Google Books API

router.get('/home', getBooksForHomepage); // Fetch books for the homepage


// NEW CODE
// Example: server/routes/bookRoutes.js (or .ts)
router.get("/finished", async (_req, res) => {
    try {
      const books = await Book.findAll({ where: { status: "finished" } });
      res.json(books); // ✅ correct response
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });




export default router;