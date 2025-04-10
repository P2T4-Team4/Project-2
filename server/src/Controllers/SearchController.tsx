import axios from "axios";
import { Request, Response } from "express";


export const searchBooks = async (req: Request, res: Response) => {
    const { q } = req.query;
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}`;

    console.log(`Searching for books with query: ${q}`); // Log the search query for debugging
    
    
    try {
        const response = await axios.get(url);
        console.log(`Received response from Google Books API:`, response.data); // Log the full response for debugging
        
        const books = response.data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors?.join(",") || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        rating: item.volumeInfo.averageRating || "N/A",
        genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Unknown",
        
    }));
    res.json(books);
} catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
}
}
