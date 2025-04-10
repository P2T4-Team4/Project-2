

import React from "react";
import BookCard from "./BookCard.js";
import Book from "../interfaces/Book.js";
import "../CSS/GenreRow.css"; // or GenreRow.css
import { useState, useEffect} from "react";


type GenreRowProps = {
  genre: string;
  books: Book[];
};


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
  
};



const GenreRow: React.FC<GenreRowProps> = ({ genre, books }) => {

  const [readListID, setReadListID] = useState<string[]>([]);
  const [wantToReadListID, setWantToReadListID] = useState<string[]>([]);

  useEffect(() => {
    const storedReadListID = localStorage.getItem("readBooks");
    const storedWantToReadListID = localStorage.getItem("wantToReadBooks");
    setReadListID(storedReadListID ? JSON.parse(storedReadListID).map((book: Book) => book.id) : []);
    setWantToReadListID(storedWantToReadListID ? JSON.parse(storedWantToReadListID).map((book: Book) => book.id) : []);
  }, []);

  const handleWantToRead = (book: Book) => {
    addWantToRead(book); // updates localStorage
    setWantToReadListID((prev) => [...prev, book.id]);
    setReadListID((prev) => prev.filter((id) => id !== book.id));
  };
  const handleReadBooks = (book: Book) => {
    addReadBooks(book); // updates localStorage
    setReadListID((prev) => [...prev, book.id]); 
    setWantToReadListID((prev) => prev.filter((id) => id !== book.id));
  };

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const openModal = (book: Book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);
  
  return (
    <div className="genre-row">
      <h2>{genre}</h2>
      <div className="genre-scroll">
        {books.map((book) => (
          <div key={book.id} className="book-card" onClick={() => openModal(book)}>
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} />
            ) : (
              <div className="book-card no-image">No Image</div>
            )}
            <p className="book-card-title">{book.title}</p>
            <p className="book-card-author">{book.authors}</p>
            <button className={wantToReadListID.includes(book.id) ? 'button added' : 'button'}
              onClick={(e) => {
                e.stopPropagation();
                handleWantToRead(book);
              }} disabled={readListID.includes(book.id)}
            >
              {wantToReadListID.includes(book.id) ? 'In List' : 'Want To Read'}
            </button>
            <button className={readListID.includes(book.id) ? 'button added' : 'button'}
              onClick={(e) => {
                e.stopPropagation();
                handleReadBooks(book);
              }} disabled={wantToReadListID.includes(book.id)}
              >
              {readListID.includes(book.id) ? 'In List' : 'Mark as Read'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreRow;
