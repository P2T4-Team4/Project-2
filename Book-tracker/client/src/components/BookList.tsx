import React from "react";
import BookCard from "./BookCard.js";

interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
}

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
    if (books.length === 0) {
        return <div className="no-books">No books found.</div>;
    }
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;