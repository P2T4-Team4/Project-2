import { useState, useEffect } from "react";
import Book from "../interfaces/Book.js";

const WantToRead = () => {
  
  const [ bookList, setBookList ] = useState<Book[]>([]);
  const [ noBooksMessage, setNoBooksMessage ] = useState<string>("");
  // const [ searchInput, setSearchInput ] = useState<string>("");

  // const searchForBooks = async (event: FormEvent, searchInput: string) => {
  //   event.preventDefault();
  //   try {
  //     // search for books using the Google Books API
  //     const book = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
  //     const data = await book.json();
  //     // list books that match the search input
  //     const books = data.items.map((item: any) => ({
  //       title: item.volumeInfo.title,
  //       authors: item.volumeInfo.authors || [],
  //       thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
  //       description: item.volumeInfo.description || "",
  //       publisher: item.volumeInfo.publisher || "",
  //       publishedDate: item.volumeInfo.publishedDate || "",
  //       pageCount: item.volumeInfo.pageCount || 0,
  //       categories: item.volumeInfo.categories || [],
  //     }));
  //     // allow the user to add the book(s) they want to read to their list
  //     setBookList(books);
  //     setNoBooksMessage("");
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //     setNoBooksMessage("No books found. Please try again.");
  //   }
  // };

  // const addToBookList = (book: Book) => {
  //   const storedBooks = localStorage.getItem("wantToReadBooks");
  //   const books = storedBooks ? JSON.parse(storedBooks) : [];
  //   // check if the book is already in the list
  //   const isBookInList = books.some((b: Book) => b.title === book.title);
  //   if (!isBookInList) {
  //     books.push(book);
  //     localStorage.setItem("wantToReadBooks", JSON.stringify(books));
  //     setNoBooksMessage("");
  //   } else {
  //     setNoBooksMessage("The book selected is already in your list.");
  //   }
  // };

  const removeFromBookList = (book: Book) => {
    const storedBooks = localStorage.getItem("wantToReadBooks");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    // remove the book from the list
    const updatedBooks = books.filter((b: Book) => b.title !== book.title);
    localStorage.setItem("wantToReadBooks", JSON.stringify(updatedBooks));
    setBookList(updatedBooks);
    setNoBooksMessage("");
  }

  const moveToReadList = (book: Book) => {
    const storedBooks = localStorage.getItem("wantToReadBooks");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
    // remove the book from the want to read list
    const updatedBooks = books.filter((b: Book) => b.title !== book.title);
    localStorage.setItem("wantToReadBooks", JSON.stringify(updatedBooks));
    // update the want to read list
    setBookList(updatedBooks);
    setNoBooksMessage("");
    //update the read list
    localStorage.setItem("readBooks", JSON.stringify(book));
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
      <h1>Book List for Future Reading</h1>
      { noBooksMessage ? (<p>{noBooksMessage}</p>) : bookList.length > 0 ? (
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
          {bookList.map((book: Book, index: number) => (
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
              <td><button onClick={() => moveToReadList(book)}>Move to Read List</button></td>
            </tr>
          ))}
        </thead>
      </table>
      ) : null }
    </div>
  );

};

export default WantToRead;
