# Library Books REST API

## Overview

This document describes a REST API design for managing books in a
library system.

The main resource is:

`/api/books`

---

## 1. List All Books

- **Method:** GET
- **Path:** `/api/books`
- **Description:** Returns a list of all books in the library.
- **Request Body:** None
- **Success Status:** `200 OK`

### Example Request

```http
GET /api/books