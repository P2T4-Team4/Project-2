import axios from "axios";
import { Request, Response } from "express";

const genres = ["Fiction", "History", "Mystery", "Science Fiction", "Fantasy", "Romance"];

export async function getBooksForHomepage(_req: Request, res: Response) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY; // Your Google Books API key
  if (!apiKey) {
    res.status(500).json({ message: "Missing Google Books API key" });
    return;
  }

  try {
    // Create an array of promises for fetching books for each genre
    const genreBooksPromises = genres.map(async (genre) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=20&key=${apiKey}`;
      const response = await axios.get(url);

      const books = (response.data.items || []).map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title || "Unknown Title",  // Added fallback if title is missing
        authors: item.volumeInfo.authors?.join(",") || 'Unknown Author', // Added fallback if authors are missing
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
        rating: item.volumeInfo.averageRating || "N/A",
        genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "Unknown",
      }));

      return { genre, books };
    });

    // Wait for all genre book data to be fetched
    const booksByGenre = await Promise.all(genreBooksPromises);

    // Transform it into an object with genres as keys (for easier frontend use)
    const booksMap: Record<string, any[]> = {};
    booksByGenre.forEach(({ genre, books }) => {
      booksMap[genre] = books;
    });

    // Send the result to the frontend
    res.json(booksMap);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books for homepage", error } );
    return;
  }
}
