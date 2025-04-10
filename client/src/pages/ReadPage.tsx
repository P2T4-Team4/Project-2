import { useState, useEffect } from 'react';
// import { fetchFinishedBooks } from '../api/booksAPI';
// import BookList from '../components/BookList';
import Book from '../interfaces/Book.js';
import '../CSS/Recommend.css';


const ReadPage = () => {

  const [readBookList, setReadBookList] = useState<Book[]>([]);
  const [noReadBooksMessage, setNoReadBooksMessage] = useState<string>("");

  const removeFromBookList = (book: Book) => {
    const storedReadBooks = localStorage.getItem("readBooks");
    const readBooks = storedReadBooks ? JSON.parse(storedReadBooks) : [];
    // remove the book from the list
    const updatedReadBooks = readBooks.filter((b: Book) => b.title !== book.title);
    localStorage.setItem("readBooks", JSON.stringify(updatedReadBooks));
    setReadBookList(updatedReadBooks);
    setNoReadBooksMessage("");
  }

  useEffect(() => {
    const storedReadBooks = localStorage.getItem('readBooks');
    let storedReadBooksList: Book[] = storedReadBooks ? JSON.parse(storedReadBooks) : [];
    
    if (storedReadBooksList.length === 0) {
      setNoReadBooksMessage('No books are on the list. Please add some books.');
    } else {
      setReadBookList(storedReadBooksList);
      setNoReadBooksMessage('');
    }
  }, []);

  return (
    <div>
      <h1 className='center'>Books Read List</h1>
      {noReadBooksMessage ? (<p className='center'>{noReadBooksMessage}</p>) : readBookList.length > 0 ? (
        <div className="book-list">
        {readBookList.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-authors">{book.authors}</p>
            <button onClick={() => removeFromBookList(book)}>Remove</button>
            {/* <p className="book-rating">Rating: {book.rating}</p> */}
          </div>
        ))}
      </div>
      ) : null }
      </div>
  );
};

export default ReadPage;

