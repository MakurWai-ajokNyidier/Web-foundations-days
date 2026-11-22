import { useEffect, useState } from "react";

import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");

  // Fetch genres
  useEffect(() => {
    fetch(`${API_URL}/genres`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load genres");
        }

        return response.json();
      })
      .then((data) => {
        setGenres(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">

      <header className="header">
        <h1>Library Management System</h1>
        <p>Discover and explore our book collection.</p>
      </header>

      <section className="filters">

        <SearchBar onSearch={setSearch} />

        <select
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
        >
          <option value="">All Genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
        </select>

      </section>

      <BookGrid
        genreId={genreId}
        search={search}
        sortBy={sortBy}
      />

    </div>
  );
}

export default HomePage;