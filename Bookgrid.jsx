import { useEffect, useState } from "react";

import BookCard from "./BookCard";

const API_URL = import.meta.env.VITE_API_URL;

function BookGrid({ genreId, search, sortBy }) {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const controller = new AbortController();

    async function fetchBooks() {

      try {

        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (genreId) {
          params.append("genreId", genreId);
        }

        if (search.trim()) {
          params.append("search", search.trim());
        }

        const response = await fetch(
          `${API_URL}/books?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve books.");
        }

        const data = await response.json();

        setBooks(data);

      } catch (err) {

        if (err.name !== "AbortError") {
          setError(err.message);
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }
    }

    fetchBooks();

    return () => {
      controller.abort();
    };

  }, [genreId, search]);

  // Sorting
  const sortedBooks = [...books].sort((a, b) => {

    return String(a[sortBy] || "").localeCompare(
      String(b[sortBy] || "")
    );

  });

  // Loading state
  if (loading) {
    return (
      <div className="book-grid">

        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton-image"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        ))}

      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="error">
        Error: {error}
      </p>
    );
  }

  // Empty state
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Books Found</h2>
        <p>Try changing your search or genre filter.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">

      {sortedBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}

    </div>
  );
}

export default BookGrid;