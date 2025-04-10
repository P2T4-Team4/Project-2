import { useState, useEffect } from "react";
import GenreRow from "../components/GenreRow.js";
import Book from "../interfaces/Book.js";
import "../CSS/Recommend.css";
import { getBookLists, updateBookList } from "../api/booksAPI.js";
import auth from "../utils/auth.js";

const genres = ["Fiction", "History", "Mystery", "Science Fiction", "Fantasy", "Romance"];

const API_URL = import.meta.env.VITE_API_URL; // Base URL for your API; adjust as needed

const Home: React.FC = () => {
    const [books, setBooks] = useState<Record<string, Book[]>>({}); // 
    const [wantToRead, setWantToRead] = useState<Book[]>([]);
    const [readBooks, setReadBooks] = useState<Book[]>([]);
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const res = await fetch(`${API_URL}/books/home`); 
            const data = await res.json();
            console.log("Fetched books for homepage:", data);
            console.log("Genres received:", Object.keys(data));
            setBooks(data);
          } catch (err) {
            console.error("Error fetching homepage books:", err);
          }
          
        };
        fetchBooks();
      }, []);

      useEffect(() => {
        const fetchLists = async () => {
          const token = auth.getToken();
          if (!token) return;
    
          try {
            const lists = await getBookLists(token);
            setWantToRead(lists.wantToRead || []);
            setReadBooks(lists.readBooks || []);
            localStorage.setItem("wantToRead", JSON.stringify(lists.wantToRead || []));
            localStorage.setItem("readBooks", JSON.stringify(lists.readBooks || []));
          } catch (err) {
            console.error("Error fetching user book lists:", err);
          }
        };
    
        fetchLists();
      }, []);

      // useEffect(() => {
      //   const syncToBackend = async () => {
      //     const token = auth.getToken();
      //     if (!token) return;
    
      //     try {
      //       await updateBookList(token, {
      //         wantToRead,
      //         readBooks,
      //       });
      //     } catch (err) {
      //       console.error("Error syncing lists to backend:", err);
      //     }
      //   };
    
      //   syncToBackend();
      // }, [wantToRead, readBooks]);
    

          return (

                <>{Object.keys(books).length === 0 ? (
                  <p>Loading books...</p>
                ) : (
                  <>
                    <p>Explore your favorite genres:</p>
                    {genres.map((genre) => (
                      <GenreRow key={genre} genre={genre} books={books[genre] || []} />
                    ))}
                  </>
                )}
                </>
            )}
        


export default Home;
