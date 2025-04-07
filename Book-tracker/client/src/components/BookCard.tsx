// import React from "react";
import Book from "../interfaces/Book.js";

// interface Book {
//     id: string;
//     title: string;
//     author: string;
//     rating: number;
// }

// const BookCard: React.FC<{ book: Book }> = ({ book }) => {
//     return (
//         <div className="book-card">
//             <h3>{book.title}</h3>
//             <p>Author: {book.author}</p>
//             <p>Rating: {book.rating}</p>
//         </div>
//     );
// };

// export default BookCard;

import React from "react";


const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="w-full h-60 overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
      <img
        src={book.coverImageUrl || `N/A`}
        alt={book.title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BookCard;