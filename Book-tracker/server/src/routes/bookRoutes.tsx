import express from "express";
import { getBooksForHomepage } from "../Controllers/bookController.js";
import { searchBooks } from "../Controllers/SearchController.js"; // Adjust the import path as necessary
const router = express.Router();

router.get("/search", searchBooks); // Search for books using Google Books API

router.get('/api/homepage', getBooksForHomepage); // Fetch books for the homepage

export default router;