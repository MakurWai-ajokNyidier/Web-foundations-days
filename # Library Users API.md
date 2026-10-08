# Library Users API

## Overview

- This project loads library user information from a public REST API.
- The data is retrieved using JavaScript `fetch()`.
- The request uses `async` and `await`.
- Errors are handled using `try`, `catch`, and `finally`.
- Loaded users are stored in a JavaScript array.
- Users can be filtered using the search box.

## API

- API URL:
  - `https://jsonplaceholder.typicode.com/users`
- HTTP method:
  - `GET`
- Response format:
  - JSON

## JavaScript Features

### `loadUsers()`

- Fetches users from the API.
- Uses `async/await` for asynchronous operations.
- Uses `try` to attempt the request.
- Uses `catch` to handle errors.
- Uses `finally` after the request completes.
- Stores the returned users in the `users` array.
- Calls `renderUsers()` after successfully loading the data.

### `renderUsers(list)`

- Accepts an array of users.
- Clears the existing user list.
- Creates a user card for every user.
- Displays:
  - Name
  - Username
  - Email
  - Phone
  - City
  - Company
- Displays `No users match your filter.` when the supplied array is empty.

## Filtering

- The filter box listens for the `input` event.
- The entered text is converted to lowercase.
- The stored users array is filtered.
- Filtering checks:
  - Name
  - Username
  - Email
- The filtered array is passed to `renderUsers()`.

## Error Handling

- If the API request fails, the error is caught by `catch`.
- An error message is displayed to the user.
- The error is also logged to the browser console.
- The `finally` block runs whether the request succeeds or fails.

## Testing the Error Path

- Temporarily change the API URL to an invalid URL.

Example:

```javascript
const API_URL = "https://jsonplaceholder.typicode.com/invalid-users";