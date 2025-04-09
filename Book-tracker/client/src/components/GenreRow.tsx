

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

// // const [alreadyWantToReadMessage, setAlreadyWantToReadMessage] = React.useState<string>('');
// // const [alreadyReadBooksMessage, setAlreadyReadBooksMessage] = React.useState<string>('');

const addWantToRead = (book: Book) => {
  // Want to grab the book id and add it to the want to read list
  const currentBook = book;
  const storedBooks = localStorage.getItem("wantToReadBooks");
  const wantToReadBooks = storedBooks ? JSON.parse(storedBooks) : [];
  // check if book is already in readBook local storage
  const storedReadBooks = localStorage.getItem("readBooks");
  const readBooks = storedReadBooks ? JSON.parse(storedReadBooks) : [];
  const bookExistsInRead = readBooks.some((book: Book) => book.id === currentBook.id);
  if (bookExistsInRead) {
    // remove the book from readBooks
    const updatedReadBooks = readBooks.filter((book: Book) => book.id !== currentBook.id);
    localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));
  }
  // check if book is already in wantToRead local storage
  const bookExists = wantToReadBooks.some((book: Book) => book.id === currentBook.id);
  if (!bookExists) {
    wantToReadBooks.push(currentBook);
    localStorage.setItem("wantToReadBooks", JSON.stringify(wantToReadBooks));
  }
  // } else {
  //   // setAlreadyWantToReadMessage("Already in Want to Read List");
  //   setTimeout(() => {
  //     // setAlreadyWantToReadMessage("");
  //   }, 2000);
  // }
};

const addReadBooks = (book: Book) => {
  // Want to grab the book id and add it to the want to read list
  const currentBook = book;
  const storedBooks = localStorage.getItem("readBooks");
  const readBooks = storedBooks ? JSON.parse(storedBooks) : [];
  // check if book is already in wantToRead local storage
  const storedWantToReadBooks = localStorage.getItem("wantToReadBooks");
  const wantToReadBooks = storedWantToReadBooks ? JSON.parse(storedWantToReadBooks) : [];
  const bookExistsInWantToRead = wantToReadBooks.some((book: Book) => book.id === currentBook.id);
  if (bookExistsInWantToRead) {
    // remove the book from wantToReadBooks
    const updatedWantToReadBooks = wantToReadBooks.filter((book: Book) => book.id !== currentBook.id);
    localStorage.setItem("wantToReadBooks", JSON.stringify(updatedWantToReadBooks));
  }
  // check if book is already in readBooks local storage
  const bookExists = readBooks.some((book: Book) => book.id === currentBook.id);
  if (!bookExists) {
    readBooks.push(currentBook);
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }
  // } else {
  //   setAlreadyReadBooksMessage("Already in Read Book List");
  //   setTimeout(() => {
  //     setAlreadyReadBooksMessage("");
  //   }, 2000);
  // }
};

const GenreRow: React.FC<GenreRowProps> = ({ genre, books }) => {
    return (
      <div className="genre-row mb-10 px-4">
        <h2 className="text-2xl font-bold capitalize mb-4">{genre}</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4">
          {books.map((book) => (
            <div key={book.id} className="flex-shrink-0 w-40">
              <div>
                {/* Book cover image */}
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-56 object-cover rounded-md shadow-md hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-300 rounded-md flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}
                <BookCard book={book} />
              </div>
              <p className="text-lg text-center mt-2">{book.title}</p>
              <p className="text-sm text-center mt-1">Author: {book.authors}</p>
              <p className="text-sm text-center">Rating: {book.rating}</p>
              <button onClick={() => addWantToRead(book)}>Want To Read</button>
              <button onClick={() => addReadBooks(book)}>Books Read</button>
              {/* {alreadyWantToReadMessage ? (<p>{alreadyWantToReadMessage}</p>) : null}
              {alreadyReadBooksMessage ? (<p>{alreadyReadBooksMessage}</p>) : null} */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  



export default GenreRow;