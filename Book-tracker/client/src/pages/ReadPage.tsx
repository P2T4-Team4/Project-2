import { useState, useEffect } from 'react';
// import { fetchFinishedBooks } from '../api/booksAPI';
// import BookList from '../components/BookList';
import Book from '../interfaces/Book.js';


// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   rating: number;
// }

// const booksRead: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
// }
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
      <h1>Books Read List</h1>
      {noReadBooksMessage ? (<p>{noReadBooksMessage}</p>) : readBookList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Publisher</th>
              <th>Published Date</th>
              <th>Page Count</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Remove</th>
              <th>Actions</th>
            </tr>
            {readBookList.map((book: Book, index: number) => (
              <tr key={index}>
              <td><img src={book.thumbnail} alt={book.title} /></td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.publishedDate}</td>
              <td>{book.pageCount}</td>
              <td>{book.categories.join(", ")}</td>
              <td>{book.description}</td>
              <td>{book.rating}</td>
              <td><button onClick={() => removeFromBookList(book)}>Remove</button></td>
            </tr>
            ))}
          </thead>
        </table>
      ) : null }
      </div>
  );
};

export default ReadPage;

