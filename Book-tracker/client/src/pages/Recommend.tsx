import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../interfaces/Book';
import Navbar from '../components/Navbar';
// import '../styles/Recommend.css';


const GoogleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?q=';
const GoodreadsAPI = 'https://www.goodreads.com/search/index.xml?key=YOUR_GOODREADS_KEY&q=';

// interface Book {
//   id: string;
//   title: string;
//   authors: string[];
//   thumbnail: string;
//   rating: string;
// }
// const Navbar: React.FC = () => {
//   return (
//     <nav className="navbar">
//       <h1 className="navbar-title">Book Tracker</h1>
//       <ul className="navbar-links">
//         <li><a href="/">Home</a></li>
//         <li><a href="/recommend">Recommendations</a></li>
//         <li><a href="/saved">Saved Books</a></li>
//       </ul>
//     </nav>
//   );
// }
const BookRecommendations: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.get(`${GoogleBooksAPI}${query}`);

      const booksWithRatings = await Promise.all(
        response.data.items.map(async (book: any) => {
          const goodreadsResponse = await axios.get(`${GoodreadsAPI}${book.volumeInfo.title}`);
          const rating = goodreadsResponse.data.GoodreadsResponse.search.results.work.average_rating;

          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
            rating: rating || "N/A",
          };
        })
      );
      setBooks(booksWithRatings);
    } catch (error) {
      console.error("Error Getting Books:", error);
    }
    setLoading(false);
  };

  const fetchGoodreadsRating = async (title: string) => {
    try {
      const response = await axios.get(`${GoodreadsAPI}${title}`);
      return response.data.GoodreadsResponse.search.results.work.average_rating;
    } catch (error) {
      return "N/A";
    }
  };
  const saveBook = (book: Book) => {
    setSavedBooks((prev) => [...prev, book]);
    localStorage.setItem('savedBooks', JSON.stringify([...savedBooks, book]));
  };

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    setSavedBooks(storedBooks);
  }, []);
  
  return (
    <div className="recommendations">
      <h1 className="title">Book Recommendations</h1>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button className="search-button" onClick={fetchBooks}>
          Search
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-authors">{book.author.join(", ")}</p>
            <p className="book-rating">Rating: {book.rating}</p>
            <button className="save-button" onClick={() => saveBook(book)}>
              Add to List
            </button>
          </div>
        ))}
      </div>

      <h2 className="saved-title">Saved Books</h2>
      <div className="saved-books">
        {savedBooks.length > 0 ? (
          savedBooks.map((book) => (
            <div key={book.id} className="saved-book-card">
              <img src={book.thumbnail} alt={book.title} className="saved-book-thumbnail" />
              <h2 className="saved-book-title">{book.title}</h2>
              <p className="saved-book-authors">{book.author.join(", ")}</p>
              <p className="saved-book-rating">Rating: {book.rating}</p>
            </div>
          ))
        ) : (
          <p className="no-saved-books">No saved books yet.</p>
        )}
      </div>
    </div>
  );
  
};
export default BookRecommendations;
export { Navbar };