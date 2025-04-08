import { useState, useEffect } from "react";
import GenreRow from "../components/GenreRow.js";
import SearchBar from "../components/SearchBar.js";
// import { searchBooks } from "../api/booksAPI.js";
import Book from "../interfaces/Book.js";
import "../CSS/Recommend.css";

const genres = ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Fantasy", "Romance"];

const API_URL = import.meta.env.VITE_API_URL; // Base URL for your API; adjust as needed
console.log("API_URL in Home.tsx:", API_URL); // Log the API URL to ensure it's being set correctly

const Home: React.FC = () => {
    const [books, setBooks] = useState<Record<string, Book[]>>({}); // Store books per genre
    const [searchResults, setSearchResults] = useState<Book[]>([]); // Store search results
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch books for each genre on page load
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
      

    // // Handle search
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
      
        if (query.trim()) {
          try {
            const res = await fetch(`${API_URL}/search?q=${query}
                `); 
      
            if (!res.ok) {
              const errorText = await res.text();
              console.error(`Server error: ${res.status}`, errorText);
              return;
            }
      
            const data = await res.json();
            console.log("Search results:", data);
            setSearchResults(data);
          } catch (err) {
            console.error("Fetch error:", err);
          }
        } else {
          setSearchResults([]);
        }
      };
      

    return (
        <div className="home">
            <h1>Welcome to Book Tracker!</h1>
            <SearchBar onSearch={handleSearch} />
            {searchQuery ? (
                <div className="search-results">
                    <h2>Search Results</h2>
                    <GenreRow genre="Search Results" books={searchResults} />
                </div>
            ) : (
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
        </div>
    );
};



export default Home;


















//Old code; kept here in needed for login later

// const Home = () => {

//     const [users, setUsers] = useState<UserData[]>([]);
//     const [error, setError] = useState(false);
//     const [loginCheck, setLoginCheck] = useState(false);

//     useEffect(() => {
//         if (loginCheck) {
//             fetchUsers();
//         }
//     }, [loginCheck]);

//     useLayoutEffect(() => {
//         checkLogin();
//     }, []);

//     const checkLogin = () => {
//         if (auth.loggedIn()) {
//             setLoginCheck(true);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const data = await retrieveUsers();
//             setUsers(data)
//         } catch (err) {
//             console.error('Failed to retrieve tickets:', err);
//             setError(true);
//         }
//     }

//     if (error) {
//         return <ErrorPage />;
//     }

//     return (
//         <>
//             {
//                 !loginCheck ? (
//                     <div className='login-notice'>
//                         <h1>
//                             Login to see your Books!
//                         </h1>
//                     </div>
//                 ) : (
//                     <UserList users={users} />
//                 )}
//         </>
//     );
// };

// export default Home;
