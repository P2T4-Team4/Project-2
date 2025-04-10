import axios from "axios";

const API_URL = "/api/books";
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchFinishedBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/finished`);
        return response.data;
    } catch (error) {
        console.error("Error fetching finished books:", error);
        return [];
    }
}

export const fetchBooksByGenre = async (genre: string) => {
    try {
        const response = await axios.get(`${API_URL}/genre/${genre}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by genre (${genre}):`, error);
        return [];
    }
}

    export const searchBooks = async (query : string) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Invalid API response: Error fetching books");
            }
            return data.items || [];
        } catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    };

export const updateBookList = async (token: string, updatedbooks: any[]) => {
    try {
        const response = await axios.put(`${API_URL}/books/update`, { updatedbooks }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating book list:", error);
        throw error;
    }
}


export const getBookLists = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/books/getLists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching book lists', error);
    throw error;
  }
};
