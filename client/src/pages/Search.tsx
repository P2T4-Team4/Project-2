import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GenreRow from "../components/GenreRow";
import Book from "../interfaces/Book";

const API_URL = import.meta.env.VITE_API_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery().get("q") || "";
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`${API_URL}/search?q=${query}`);
        const data = await res.json();
        console.log("Search results from API:", data);
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="search-page">
      <h2>Search Results for: <em>{query}</em></h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <GenreRow genre="Search Results" books={searchResults} />
      )}
    </div>
  );
};

export default SearchResultsPage;
