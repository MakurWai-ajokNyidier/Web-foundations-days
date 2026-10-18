const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadButton = document.querySelector("#load-btn");
const statusMessage = document.querySelector("#status");
const noteForm = document.querySelector("#note-form");
const titleInput = document.querySelector("#title-input");
const bodyInput = document.querySelector("#body-input");
const submitButton = document.querySelector("#submit-btn");
const notesList = document.querySelector("#notes-list");
const titleCount = document.querySelector("#title-count");

let notes = [];
let isLoading = false;
let isSubmitting = false;
const deletingIds = new Set();

/**
 * Reusable request helper. It returns parsed JSON and throws for HTTP errors.
 */
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`Request failed with HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

function setStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `status status-${type}`;
}

function updateButtons() {
  loadButton.disabled = isLoading;
  submitButton.disabled = isSubmitting;
  loadButton.textContent = isLoading ? "Loading..." : "Load 10 notes";
  submitButton.textContent = isSubmitting ? "Creating..." : "Create note";
}

function renderNotes() {
  // Build nodes with DOM APIs and textContent; never insert user/API text as HTML.
  notesList.replaceChildren();

  if (notes.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";
    emptyItem.textContent = "No notes to show. Load notes or create your first note.";
    notesList.appendChild(emptyItem);
    return;
  }

  for (const note of notes) {
    const item = document.createElement("li");
    item.className = "note-card";

    const heading = document.createElement("h3");
    heading.textContent = note.title || "Untitled note";

    const body = document.createElement("p");
    body.textContent = note.body || "No body provided.";

    const meta = document.createElement("small");
    meta.textContent = `Note ID: ${note.id}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = deletingIds.has(note.id) ? "Deleting..." : "Delete";
    deleteButton.disabled = deletingIds.has(note.id) || isLoading || isSubmitting;
    deleteButton.addEventListener("click", () => deleteNote(note.id));

    item.append(heading, body, meta, deleteButton);
    notesList.appendChild(item);
  }
}

async function loadNotes() {
  if (isLoading) return;
  isLoading = true;
  updateButtons();
  setStatus("Loading notes...", "loading");

  try {
    const data = await request(`${API_URL}?_limit=10`);
    notes = Array.isArray(data) ? data : [];
    renderNotes();

    if (notes.length === 0) {
      setStatus("No notes were returned. You can create a note below.", "empty");
    } else {
      setStatus(`Successfully loaded ${notes.length} notes.`, "success");
    }
  } catch (error) {
    setStatus(`Could not load notes. ${error.message}`, "error");
    notes = [];
    renderNotes();
  } finally {
    isLoading = false;
    updateButtons();
    renderNotes();
  }
}

async function createNote(event) {
  event.preventDefault();
  if (isSubmitting) return;

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title) {
    setStatus("Please enter a title; the title is required.", "error");
    titleInput.focus();
    return;
  }
  if (title.length > 100) {
    setStatus("The title must be 100 characters or fewer.", "error");
    titleInput.focus();
    return;
  }

  isSubmitting = true;
  updateButtons();
  renderNotes();
  setStatus("Creating your note...", "loading");

  try {
    const created = await request(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    // JSONPlaceholder returns a synthetic ID for the created resource.
    if (created) {
      notes.unshift(created);
      renderNotes();
    }
    noteForm.reset();
    updateTitleCount();
    setStatus("Note created successfully (demo API; it may not persist after refresh).", "success");
  } catch (error) {
    setStatus(`Could not create the note. ${error.message}`, "error");
  } finally {
    isSubmitting = false;
    updateButtons();
    renderNotes();
  }
}

async function deleteNote(id) {
  if (deletingIds.has(id)) return;
  deletingIds.add(id);
  renderNotes();
  setStatus("Deleting note...", "loading");

  try {
    await request(`${API_URL}/${encodeURIComponent(id)}`, { method: "DELETE" });
    notes = notes.filter(note => String(note.id) !== String(id));
    renderNotes();
    setStatus("Note deleted successfully (demo API; deletion is simulated).", "success");
    if (notes.length === 0) {
      setStatus("No notes remain. Load notes or create a new note.", "empty");
    }
  } catch (error) {
    setStatus(`Could not delete the note. ${error.message}`, "error");
  } finally {
    deletingIds.delete(id);
    updateButtons();
    renderNotes();
  }
}

function updateTitleCount() {
  titleCount.textContent = `${titleInput.value.length} / 100 characters`;
}

loadButton.addEventListener("click", loadNotes);
noteForm.addEventListener("submit", createNote);
titleInput.addEventListener("input", updateTitleCount);

// Show an explicit empty state before the first request.
renderNotes();
updateTitleCount();
