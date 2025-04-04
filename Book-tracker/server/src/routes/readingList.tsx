import express from "express";
import { addtoreadinglist, getReadingList, updateReadingList, deleteFromReadingList } from "../Controllers/readingList"; 
import { authenticateToken } from "../middleware/auth.js"; // Corrected the path to the authentication middleware

const router = express.Router();

router.post("/add", authenticateToken, addtoreadinglist); // Add authentication middleware
router.get("/:userId", authenticateToken, getReadingList); // Add authentication middleware
router.patch("/:id", authenticateToken, updateReadingList); // Add authentication middleware
router.delete("/:id", authenticateToken, deleteFromReadingList); // Add authentication middleware