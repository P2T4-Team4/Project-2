import React, { useState, useEffect } from 'react';
import { fetchFinishedBooks } from '../api/booksAPI';
import BookList from '../components/BookList';


interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
}

// const booksRead: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
// }

