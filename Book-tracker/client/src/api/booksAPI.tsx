import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/books";

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