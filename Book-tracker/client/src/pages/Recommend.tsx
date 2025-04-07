import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../interfaces/Book.js';
import '../CSS/Recommend.css';


const GOOGLE_BOOKS_API_KEY = 'AIzaSyBWlIaquf4-vAgM-6c8A8ICfKbBXsgobU8';
const GoogleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?q=';


const BookRecommendations: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved books from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    setSavedBooks(storedBooks);
    if (storedBooks.length > 0) {
      fetchRecommendations(storedBooks);
    }
  }, []);

  // Generate search query and fetch recommendations
  const fetchRecommendations = async (savedBooks: Book[]) => {
    setLoading(true);

    try {
      const searchQuery = savedBooks
        .slice(0, 3) // 
        .map((book) => book.title)
        .join('|'); 

      // Fetch recommendations from Google Books API
      const response = await axios.get(`${GoogleBooksAPI}${searchQuery}&key=${GOOGLE_BOOKS_API_KEY}`);
      
      if (response.data.items) {
        setRecommendedBooks(
          response.data.items.map((book: any) => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
            rating: book.volumeInfo.averageRating || 'N/A',
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }

    setLoading(false);
  };

  return (
    <div className="recommendations">
      <h1>Saved Books</h1>
      <div>
        {savedBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Rating: {book.rating}</p>
          </div>
        ))}
      </div>
      <h1 className="title">Recommended Books for You📚</h1>

      {loading && <p className="loading">Loading recommendations...</p>}

      <div className="book-list">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-authors">{book.author}</p>
            <p className="book-rating">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendations;
