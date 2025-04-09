import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../interfaces/Book.js';
import '../CSS/Recommend.css';


// const GOOGLE_BOOKS_API_KEY = 'AIzaSyBWlIaquf4-vAgM-6c8A8ICfKbBXsgobU8';
const GoogleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?q=';
const API_URL = import.meta.env.VITE_API_URL;

const BookRecommendations: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch saved books from localStorage
  useEffect(() => {
    const wantToReadBooks = JSON.parse(localStorage.getItem('wantToReadBooks') || '[]');
    const readBooks = JSON.parse(localStorage.getItem('readBooks') || '[]');
    console.log('Want to Read Books:', wantToReadBooks);
    console.log('Read Books:', readBooks);
    
    const allBooksMap = new Map<string, Book>();
    [...wantToReadBooks, ...readBooks].forEach((book: Book) => {
      allBooksMap.set(book.id, book);
    });
    console.log('Combined Books:', allBooksMap);

    const combinedBooks = Array.from(allBooksMap.values());
    setSavedBooks(combinedBooks);
    console.log('Saved Books:', combinedBooks);

    
    localStorage.setItem('savedBooks', JSON.stringify(combinedBooks));

    if (combinedBooks.length > 0) {
      fetchRecommendations(combinedBooks);
    }
  }, []);

  // Generate search query and fetch recommendations
  const fetchRecommendations = async (books: Book[]) => {
    setLoading(true);

    // try {
    //   const searchQuery = savedBooks
    //     .slice(0, 3) // 
    //     .map((book) => book.title)
    //     .join('|'); 

    //   // Fetch recommendations from Google Books API
    //   console.log('Search query:', searchQuery);
    //   console.log('API URL:', API_URL);
    //   console.log('Google Books API:', GoogleBooksAPI);
    //   console.log('Full URL:', `${GoogleBooksAPI}${searchQuery}&key=${API_URL}`);
    //   console.log(`${GoogleBooksAPI}${searchQuery}&key=${API_URL}`);
      
    //   const response = await axios.get(`${GoogleBooksAPI}${searchQuery}&key=${API_URL}`);
      
    try {
      const genres = new Set<string>();
      books.forEach((book) => {
        if (book.categories) {
          book.categories.forEach((category) => genres.add(category));
        }
      });

      const searchTermsRaw= genres.size > 0
        ? Array.from(genres).slice(0, 3).join(' ')
        : books.slice(0, 3).map(book => book.title).join(' ');
        const searchTerms = encodeURIComponent(searchTermsRaw);

        if (!searchTerms) {
          console.warn('No search terms found for recommendations.');
          setLoading(false);
          return;
        }

        const apiURL = `${GoogleBooksAPI}${searchTerms}`;
        console.log('Final API URL:', apiURL);

        const response = await axios.get(apiURL);


      // if (response.data.items) {
      //   const recommended: Book[] = response.data.items.map((book: any) => ({
      //     id: book.id,
      //     title: book.volumeInfo.title,
      //     authors: book.volumeInfo.authors || [],
      //     thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
      //     rating: book.volumeInfo.averageRating ?? 0,
      //   }));

      //   setRecommendedBooks(recommended);
      // }

      if (response.data.items) {
        const recommended: Book[] = response.data.items.map((book: any) => {
          console.log('Book Image Links:', book.volumeInfo.imageLinks); 
          
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
            rating: book.volumeInfo.averageRating ?? 0,
          };
        });
  
        setRecommendedBooks(recommended);
      }
      
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching recommendations:', error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }

  };

  // return (
  //   <div className="recommendations">
      {/* <h1>Saved Books</h1>
      <div>
        {savedBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} />
            <h2>{book.title}</h2>
            <p>{book.authors}</p>
            <p>Rating: {book.rating}</p>
          </div>
        ))} */}
      {/* </div>
      <h1 className="title">Recommended Books for You📚</h1>

      {loading && <p className="loading">Loading recommendations...</p>}

      <div className="book-list">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-authors">{book.authors}</p>
            <p className="book-rating">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; */
return (
  <div className="recommendations">
    <h1 className="title">Recommended Books for You 📚</h1>

    {loading && <p className="loading">Loading recommendations...</p>}

    <div className="book-list">
      {recommendedBooks.map((book) => (
        <div key={book.id} className="book-card">
          <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
          <h2 className="book-title">{book.title}</h2>
          <p className="book-authors">{book.authors.join(', ')}</p>
          {/* <p className="book-rating">Rating: {book.rating}</p> */}
        </div>
      ))}
    </div>
  </div>
);
};
}

export default BookRecommendations;
