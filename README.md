# QuickNotes API Client

QuickNotes is a small browser-based notes client built to practise REST API concepts. It loads notes, creates a note, and deletes notes using the JSONPlaceholder demonstration API.

## Features

- Loads 10 posts with `GET`.
- Creates a note with `POST`.
- Deletes a note with `DELETE`.
- Displays loading, success, error, and empty states.
- Validates that a title is present and no longer than 100 characters.
- Disables relevant buttons while requests are running.
- Uses `textContent` and DOM methods to display text safely.
- Includes API design, relational data-model, and architecture documentation.

> **Demo API limitation:** JSONPlaceholder simulates writes. A created or deleted post may not persist after the page is refreshed.

## How to run the API client

1. Download or clone this project.
2. Open the project folder in a code editor.
3. Start a local static server from the project root. For example, with Python installed:
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000` in a browser.
5. Select **Load 10 notes**, or enter a title and optional body and select **Create note**.
6. Use the **Delete** button on a note to test the DELETE request.

The browser needs an internet connection to reach JSONPlaceholder. You do not need to install server dependencies for this client-only demonstration.

## Documentation

- [API design](docs/api-design.md)
- [Data model](docs/data-model.md)
- [Architecture and scaling](docs/architecture.md)

## What I learned

- How `fetch`, `async`/`await`, `try`/`catch`, and `finally` can make API requests easier to manage.
- How REST methods and HTTP status codes represent listing, creating, and deleting resources.
- Why validating user input and displaying errors clearly improve usability.
- Why untrusted text should be rendered with `textContent` instead of being inserted as HTML.
- How primary keys, foreign keys, indexes, and join tables protect relational data and support queries.
- How caching, read replicas, load balancing, and background queues can help a system scale.

## Suggested Git history

Make at least five meaningful commits, for example:

1. `Create QuickNotes HTML structure`
2. `Add API request and note CRUD functions`
3. `Style note list and request status states`
4. `Document REST API and data model`
5. `Document architecture and scaling plan`
6. `Complete README and final checks`
