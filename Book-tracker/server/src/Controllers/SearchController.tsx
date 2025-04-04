import axios from "axios";
import { Request, Response } from "express";

export const searchBooks = async (req: Request, res: Response) => {
    const { query } = req.query;
    const apiKey = process.env.VITE_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const books = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        rating: item.volumeInfo.averageRating || "N/A",
        }));
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books" });
    }
}