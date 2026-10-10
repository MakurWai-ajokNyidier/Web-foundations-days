# Library Books REST API

## Base URL

`https://api.example.com`

## Endpoints

### 1. List All Books
- **Method:** GET
- **Path:** `/books`
- **Description:** Retrieves all books in the library.
- **Success Status:** 200 OK

### 2. Get One Book
- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Retrieves a book using its ID.
- **Success Status:** 200 OK

### 3. Create a Book
- **Method:** POST
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example Request Body:**
  ```json
  {
    "title": "Introduction to Programming",
    "author": "John Smith",
    "publishedYear": 2024
  }

* **Success Status:** 201 Created

### 4. Update a Book

* **Method:** PUT
* **Path:** `/books/{id}`
* **Description:** Updates an existing book.
* **Example Request Body:**

  ```json
  {
    "title": "Advanced Programming",
    "author": "John Smith",
    "publishedYear": 2025
  }
  ```
* **Success Status:** 200 OK

### 5. Delete a Book

* **Method:** DELETE
* **Path:** `/books/{id}`
* **Description:** Deletes a book using its ID.
* **Success Status:** 204 No Content

### 6. List Books by Author

* **Method:** GET
* **Path:** `/books?author=John%20Smith`
* **Description:** Retrieves books written by the specified author.
* **Success Status:** 200 OK

## Error Responses

### 400 Bad Request

* **Description:** The request contains invalid data.
* **Example:** Creating a book without a required title or author.

### 404 Not Found

* **Description:** The requested resource does not exist.
* **Example:** Requesting `GET /books/999` when book 999 does not exist.