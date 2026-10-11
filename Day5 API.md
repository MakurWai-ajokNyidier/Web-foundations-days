# Library Books REST API

## Base URL
`https://api.example.com`

## Endpoints

### 1. List All Books
- **Method:** GET
- **Path:** `/books`
- **Description:** Retrieves a list of all books in the library.
- **Success Status Code:** 200 OK

### 2. Get One Book
- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Retrieves a specific book using its unique ID.
- **Success Status Code:** 200 OK

### 3. Create a Book
- **Method:** POST
- **Path:** `/books`
- **Description:** Creates a new book in the library.
- **Example Request Body:**

  {
    "title": "Introduction to Programming",
    "author": "John Smith",
    "publishedYear": 2024
  }


* **Success Status Code:** 201 Created

### 4. Update a Book

* **Method:** PUT
* **Path:** `/books/{id}`
* **Description:** Updates the details of an existing book.
* **Example Request Body:**

{
    "title": "Advanced Programming",
    "author": "John Smith",
    "publishedYear": 2025
}  

* **Success Status Code:** 200 OK

### 5. Delete a Book

* **Method:** DELETE
* **Path:** `/books/{id}`
* **Description:** Deletes a book using its unique ID.
* **Success Status Code:** 204 No Content

### 6. List Books by Author

* **Method:** GET
* **Path:** `/books?author=John%20Smith`
* **Description:** Retrieves all books written by the specified author.
* **Success Status Code:** 200 OK

## Error Responses

### 400 Bad Request

* **Description:** The request contains invalid data.
* **Example:** Creating a book without a required title or author.

### 404 Not Found

* **Description:** The requested resource does not exist.
* **Example:** Requesting `GET /books/999` when book ID 999 does not exist.
