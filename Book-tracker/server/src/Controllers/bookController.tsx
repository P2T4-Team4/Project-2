import axios from "axios";
import { Request, Response } from "express";
// import { Book } from "../models";

// export const searchBooks = async (req: Request, res: Response) => {
//     const { query } = req.query;
//     const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
//     const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;
    
//     try {
//         const response = await axios.get(url);
//         const books = response.data.items.map((item: any) => ({
//         id: item.id,
//         title: item.volumeInfo.title,
//         authors: item.volumeInfo.authors || [],
//         thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
//         rating: item.volumeInfo.averageRating || "N/A",
//         }));
//         res.json(books);
//     } catch (error) {
//         console.error("Error fetching books:", error);
//         res.status(500).json({ message: "Error fetching books" });
//     }
// }

const genres = ['fiction', 'mystery', 'romance', 'fantasy', 'non-fiction', 'science fiction'];

export async function getBooksForHomepage(req: Request, res: Response) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY; // Your Google Books API key

    try {
        // Create an array of promises for fetching books for each genre
        const genreBooksPromises = genres.map(async (genre) => {
            const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${apiKey}`;
            const response = await axios.get(url);
            const books = response.data.items.map((item: any) => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                genre: genre,  // Include the genre for categorization
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
                rating: item.volumeInfo.averageRating || "N/A",
            }));
            return { genre, books };
        });

        // Wait for all genre book data to be fetched
        const booksByGenre = await Promise.all(genreBooksPromises);

        // Send the result to the frontend
        res.json(booksByGenre);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Error fetching books for homepage" });
    }
}