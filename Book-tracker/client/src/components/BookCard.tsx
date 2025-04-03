import React from "react";

interface Book {
    id: string;
    title: string;
    author: string;
    rating: number;
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Rating: {book.rating}</p>
        </div>
    );
};

export default BookCard;