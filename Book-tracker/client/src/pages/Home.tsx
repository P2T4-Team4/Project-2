import { useState, useEffect } from "react";
import GenreRow from "../components/GenreRow";
import SearchBar from "../components/SearchBar";
import { searchBooks } from "../api/booksAPI";
import Book from "../interfaces/Book";

const genres = ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Fantasy", "Romance"];

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book>(''); // Store books per genre
    const [searchResults, setSearchResults] = useState<any[]>([]); // Store search results
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch books for each genre on page load
    useEffect(() => {
        const fetchBooks = async () => {
            const fetchedBooks: Record<string, any[]> = {};
            for (const genre of genres) {
                const res = await fetch(`http://localhost:3000/books/search?q=${genre}`);
                const data = await res.json();
                fetchedBooks[genre] = data;
            }
            setBooks(fetchedBooks);
        };
        fetchBooks();
    }, []);
    

    // Handle search
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            const res = await fetch(`http://localhost:3000/books/search?q=${query}`);
            const data = await res.json();
            setSearchResults(data);
        } else {
            setSearchResults([]); // Clear search results when query is empty
        }
    };

    return (
        <div className="home">
            <h1>Welcome to Book Tracker!</h1>
            <SearchBar onSearch={searchBooks} />
            {searchQuery ? (
                <div className="search-results">
                    <h2>Search Results</h2>
                    <GenreRow genre="Search Results" books={searchResults} />
                </div>
            ) : (
                <>
                    <p>Explore your favorite genres:</p>
                    {genres.map((genre) => (
                        <GenreRow key={genre} genre={genre} books={books[genre] || []} />
                    ))}
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
