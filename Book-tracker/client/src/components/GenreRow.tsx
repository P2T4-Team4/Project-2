// // import React, {useEffect, useState} from "react";
// import React from "react";
// // import { fetchBooksByGenre } from "../api/booksAPI.js";
// import BookCard from "./BookCard.js";
// // import Book from "../interfaces/Book";
// // import Book from "../interfaces/Book.js";
// // import "../styles/GenreRow.css";

// type Book = {
//     id: string;
//     title: string;
//     // cover: string;
//     author: string; //needs to be removed? (below)
//     rating: number;
//     coverImageUrl: string;
// }

// type GenreRowProps = {
//     genre: string;
//     books: Book[];
// }

// const GenreRow: React.FC<GenreRowProps> = ({ genre, books }) => {


//     return (
//         <div className="genre-row">
//             <h2>{genre}</h2>
//             <div className="book-list">
//                 <ul>
//                 {books.map((book) => (
//                     // <BookCard key={book.id} {...book} />
//                     <li key={book.id}>
//                         <BookCard book={book} />
//                         <p>Author: {book.author}</p>
//                         <p>Rating: {book.rating}</p>
//                     </li>
//                 ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }


// export default GenreRow;

import React from "react";
import BookCard from "./BookCard.js";
import Book from "../interfaces/Book.js";

// type Book = {
//   id: string;
//   title: string;
//   author: string;
//   rating: number;
//   coverImageUrl: string;
// };

type GenreRowProps = {
  genre: string;
  books: Book[];
};

const GenreRow: React.FC<GenreRowProps> = ({ genre, books }) => {
    return (
      <div className="genre-row mb-10 px-4">
        <h2 className="text-2xl font-bold capitalize mb-4">{genre}</h2>
        <div className="flex overflow-x-auto space-x-4">
          {books.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-40">
              <div className="book-card">
                {/* Book cover image */}
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-56 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-300 rounded-md flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
                <BookCard book={book} />
              </div>
              <p className="text-sm text-center mt-2">Author: {book.author}</p>
              <p className="text-sm text-center">Rating: {book.rating}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  



export default GenreRow;