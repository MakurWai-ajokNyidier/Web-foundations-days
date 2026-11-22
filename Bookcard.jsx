import { Link } from "react-router-dom";

function BookCard({ book }) {

  return (
    <div className="book-card">

      <div className="book-cover">
        📚
      </div>

      <div className="book-info">

        <h3>{book.title}</h3>

        <p>
          <strong>Author:</strong> {book.author}
        </p>

        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>

        <p>
          <strong>Available Copies:</strong>{" "}
          {book.availableCopies ?? "Not specified"}
        </p>

        <Link
          to={`/books/${book.id}`}
          className="details-button"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default BookCard;