
import React from "react";
import Book from "../interfaces/Book.js";

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return book.thumbnail ? (
    <img
      // src={book.thumbnail}
      // alt={book.title}
      // className="w-full h-60 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
    />
  ) : null;
};

export default BookCard;

