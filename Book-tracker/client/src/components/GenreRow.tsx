import React, {useEffect, useState} from "react";
import { fetchBooksByGenre } from "../api/booksAPI.js";
import BookCard from "./BookCard.js";
// import Book from "../interfaces/Book";

interface Book {
    id: string;
    title: string;
    cover: string;
    author: string; //needs to be removed? (below)
    rating: number;
}

const GenreRow: React.FC<{genre: string}> = ({ genre }) => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks = await fetchBooksByGenre(genre);
            setBooks(fetchedBooks);
        };
        fetchBooks();
    }, [genre]);

    return (
        <div className="genre-row">
            <h2>{genre}</h2>
            <div className="book-list">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default GenreRow;