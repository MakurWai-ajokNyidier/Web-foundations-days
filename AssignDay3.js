// Starting notes data
let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" },
];


// searchNotes(word)
// Returns notes whose text contains the given word.
// The search ignores upper and lower case.
function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}


// 2. longestNote()
// Returns the note with the most characters.
// Returns null if there are no notes.
function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (let note of notes) {
        if (note.text.length > longest.text.length) {
            longest = note;
        }
    }

    return longest;
}


// countByCategory()
function countByCategory() {
    let counts = {};

    for (let note of notes) {
        if (counts[note.category]) {
            counts[note.category]++;
        } else {
            counts[note.category] = 1;
        }
    }

    return counts;
}


// getSummary()

function getSummary() {
    let counts = countByCategory();
    let total = notes.length;

    let noteWord = total === 1 ? "note" : "notes";

    return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}


// isDuplicate(text)
function isDuplicate(text) {
    let cleanedText = text.trim().toLowerCase();

    return notes.some(note =>
        note.text.trim().toLowerCase() === cleanedText
    );
}


// addNote(text, category)
// Adds a note only when:
// - text is between 1 and 200 characters
// - the note is not a duplicate
// - category is personal, work, or study
// Returns true when added and false otherwise.
function addNote(text, category) {

    // Check text length
    if (text.trim().length < 1 || text.length > 200) {
        console.log("Note not added: text must be between 1 and 200 characters.");
        return false;
    }

    // Check for duplicate
    if (isDuplicate(text)) {
        console.log("Note not added: duplicate note.");
        return false;
    }

    // Check category
    if (
        category !== "personal" &&
        category !== "work" &&
        category !== "study"
    ) {
        console.log("Note not added: invalid category.");
        return false;
    }

    // Create a new ID
    let newId = notes.length > 0
        ? Math.max(...notes.map(note => note.id)) + 1
        : 1;

    // Add the new note
    notes.push({
        id: newId,
        text: text,
        category: category
    });

    console.log("Note added successfully.");

    return true;
}

// ============================== TESTING THE FUNCTIONS ==============================
console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

// Edge case: no matching notes
console.log(searchNotes("football"));
// Expected: []



// Test longestNote()
// Normal case
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: empty notes array
let savedNotesForLongestTest = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotesForLongestTest;

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

// Edge case: empty notes array
let savedNotesForCountTest = notes;
notes = [];
console.log(countByCategory());
// Expected: {}
notes = savedNotesForCountTest;

// Test getSummary()
// Normal case
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

// Edge case: one note
let savedNotesForSummaryTest = notes;
notes = [
    { id: 1, text: "Study JavaScript", category: "study" }
];

console.log(getSummary());
// Expected: "1 note: 0 personal, 0 work, 1 study."

notes = savedNotesForSummaryTest;

// Test isDuplicate()
// Normal case
console.log(isDuplicate("Call mum"));
// Expected: true

// Edge case: different text
console.log(isDuplicate("Go to the market"));
// Expected: false

// Extra test: upper case and extra spaces
console.log(isDuplicate("   CALL MUM   "));
// Expected: true

// Test addNote()
console.log(addNote("Prepare for the JavaScript test", "study"));
// Expected: true
// Console also logs: "Note added successfully."

// Edge case: duplicate note
console.log(addNote("  CALL MUM  ", "personal"));
// Expected: false
// Console also logs: "Note not added: duplicate note."

// Edge case: invalid category
console.log(addNote("Buy a new notebook", "shopping"));
// Expected: false
// Console also logs: "Note not added: invalid category."

// Edge case: empty text
console.log(addNote("", "personal"));
// Expected: false
// Console also logs: "Note not added: text must be between 1 and 200 characters."

// Edge case: text longer than 200 characters
console.log(
    addNote(
        "call mum ".repeat(30), // 210 characters
        "personal"
    )
);
// Expected: false
// Console also logs: "Note not added: text must be between 1 and 200 characters."