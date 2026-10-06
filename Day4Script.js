// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

// Get HTML elements
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");
const noteCount = document.getElementById("note-count");
const notesList = document.getElementById("notes-list");
const clearAllButton = document.getElementById("clear-all-button");


// Save notes to localStorage
function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}


// Display notes
function renderNotes() {
    const searchWords = searchInput.value.trim().toLowerCase();

    let filteredNotes = notes;

    // Search notes
    if (searchWords !== "") {
        filteredNotes = notes.filter(function (note) {
            return note.text.toLowerCase().includes(searchWords);
        });
    }

    // Clear existing list
    notesList.innerHTML = "";

    // Show search message when no notes match
    if (searchWords !== "" && filteredNotes.length === 0) {
        const noResults = document.createElement("li");

        noResults.className = "empty-message";
        noResults.textContent = "No notes match your search.";

        notesList.appendChild(noResults);
    } else {

        filteredNotes.forEach(function (note) {

            const listItem = document.createElement("li");

            // Convert category to CSS class
            const categoryClass =
                "category-" + note.category.toLowerCase();

            listItem.className = "note-card " + categoryClass;

            // Note text
            const noteText = document.createElement("p");
            noteText.className = "note-text";
            noteText.textContent = note.text;

            // Metadata container
            const noteMeta = document.createElement("div");
            noteMeta.className = "note-meta";

            // Category label
            const categoryLabel = document.createElement("span");
            categoryLabel.className = "category-label";
            categoryLabel.textContent = note.category;

            // Date
            const date = document.createElement("span");
            date.textContent = note.createdAt;

            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-button";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                deleteNote(note.id);
            });

            // Build metadata
            noteMeta.appendChild(categoryLabel);
            noteMeta.appendChild(date);
            noteMeta.appendChild(deleteButton);

            // Build note card
            listItem.appendChild(noteText);
            listItem.appendChild(noteMeta);

            notesList.appendChild(listItem);
        });
    }

    updateNoteCount();
}


// Add a new note
noteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const text = noteInput.value.trim();
    const category = categorySelect.value;

    // Empty note validation
    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Maximum length validation
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Create note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    // Add note
    notes.push(newNote);

    // Save changes
    saveNotes();

    // Clear form
    noteInput.value = "";

    // Clear error
    errorMessage.textContent = "";

    // Display updated notes
    renderNotes();
});


// Delete a note
function deleteNote(id) {

    notes = notes.filter(function (note) {
        return note.id !== id;
    });

    saveNotes();
    renderNotes();
}


// Update note count
function updateNoteCount() {

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent =
            "You have " + notes.length + " notes.";
    }
}


// Search as the user types
searchInput.addEventListener("input", function () {
    renderNotes();
});


// Clear all notes
clearAllButton.addEventListener("click", function () {

    if (confirm("Delete all notes?")) {

        notes = [];

        saveNotes();
        renderNotes();
    }
});


// Display saved notes when page opens
renderNotes();