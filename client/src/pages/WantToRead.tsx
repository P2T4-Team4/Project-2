import { useState, useEffect } from "react";
import Book from "../interfaces/Book.js";
import { updateBookList } from "../api/booksAPI.js";


const WantToRead = () => {
  
  const [ bookList, setBookList ] = useState<Book[]>([]);
  const [ noBooksMessage, setNoBooksMessage ] = useState<string>("");

  const updateServer = async (updatedBooks: Book[]) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        await updateBookList(token, updatedBooks);
      }
    } catch (error) {
      console.error("Error updating server:", error);
    }
  }


  const removeFromBookList = (book: Book) => {
    const storedBooks = localStorage.getItem("wantToReadBooks");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    // remove the book from the list
    const updatedBooks = books.filter((b: Book) => b.title !== book.title);
    localStorage.setItem("wantToReadBooks", JSON.stringify(updatedBooks));
    setBookList(updatedBooks);
    setNoBooksMessage("");
    updateServer(updatedBooks);
  }

  const moveToReadList = (book: Book) => {
    const storedBooks = localStorage.getItem("wantToReadBooks");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    // remove the book from the want to read list
    const updatedBooks = books.filter((b: Book) => b.title !== book.title);
    localStorage.setItem("wantToReadBooks", JSON.stringify(updatedBooks));
    // update the want to read list
    setBookList(updatedBooks);
    //update the read list
    const storedReadBooks = localStorage.getItem("readBooks");
    const readBooks = storedReadBooks ? JSON.parse(storedReadBooks) : [];
    // check if the book is already in the read list
    const isBookInReadList = readBooks.some((b: Book) => b.title === book.title);
    if (!isBookInReadList) {
      readBooks.push(book);
    } else {
      setNoBooksMessage("The book selected is already in your read list.");
    }
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
    setNoBooksMessage("");
    updateServer(updatedBooks);
  };

  useEffect(() => {
    const storedBooks = localStorage.getItem('wantToReadBooks');
    let storedBooksList: Book[] = storedBooks ? JSON.parse(storedBooks) : [];
    
    if (storedBooksList.length === 0) {
      setNoBooksMessage('No books are on the list. Please add some books.');
    } else {
      setBookList(storedBooksList);
      setNoBooksMessage('');
    }
  }, []);

  return (
    <div>
      <h1 className="center">Book List for Future Reading</h1>
      { noBooksMessage ? (<p className="center">{noBooksMessage}</p>) : bookList.length > 0 ? (
      <div className="book-list">
      {bookList.map((book) => (
        <div key={book.id} className="book-card">
          <img src={book.thumbnail} alt={book.title} className="book-thumbnail" />
          <h2 className="book-title">{book.title}</h2>
          <p className="book-authors">{book.authors}</p>
          <button onClick={() => removeFromBookList(book)}>Remove</button>
          <button onClick={() => moveToReadList(book)}>Move to Read List</button>
        </div>
      ))}
    </div>
    ) : null }
    </div>
  );
};

export default WantToRead;
