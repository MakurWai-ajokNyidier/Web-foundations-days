import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function BookDetail() {

  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const controller = new AbortController();

    async function fetchBook() {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/books/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Book not found.");
        }

        const data = await response.json();

        setBook(data);

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

    fetchBook();

    return () => {
      controller.abort();
    };

  }, [id]);

  if (loading) {
    return <h2 className="message">Loading book details...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  if (!book) {
    return <h2>Book not found.</h2>;
  }

  return (

    <div className="detail-container">

      <Link to="/" className="back-button">
        ← Back to Catalog
      </Link>

      <div className="detail-card">

        <div className="detail-cover">
          📖
        </div>

        <div className="detail-info">

          <h1>{book.title}</h1>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>

          <p>
            <strong>Genre:</strong>{" "}
            {book.genre?.name || "Not specified"}
          </p>

          <p>
            <strong>Total Copies:</strong>{" "}
            {book.totalCopies ?? "Not specified"}
          </p>

          <p>
            <strong>Available Copies:</strong>{" "}
            {book.availableCopies ?? "Not specified"}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {book.description || "No description available."}
          </p>

        </div>

      </div>

    </div>
  );
}

export default BookDetail;