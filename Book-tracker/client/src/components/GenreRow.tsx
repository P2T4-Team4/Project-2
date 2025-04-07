// import React, {useEffect, useState} from "react";
import React from "react";
// import { fetchBooksByGenre } from "../api/booksAPI.js";
import BookCard from "./BookCard.js";
// import Book from "../interfaces/Book";

type Book = {
    id: string;
    title: string;
    // cover: string;
    author: string; //needs to be removed? (below)
    rating: number;
}

type GenreRowProps = {
    genre: string;
    books: Book[];
}

const GenreRow: React.FC<GenreRowProps> = ({ genre, books }) => {


    return (
        <div className="genre-row">
            <h2>{genre}</h2>
            <div className="book-list">
                <ul>
                {books.map((book) => (
                    // <BookCard key={book.id} {...book} />
                    <li key={book.id}>
                        <BookCard book={book} />
                        <p>Author: {book.author}</p>
                        <p>Rating: {book.rating}</p>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default GenreRow;