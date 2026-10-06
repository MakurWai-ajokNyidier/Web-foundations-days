const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "quicknotes-draft";
const THEME_KEY = "quicknotes-theme";

function updateCounters() {
    const text = noteText.value;
    const characters = text.length;

    const trimmedText = text.trim();
    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    charCount.textContent = `${characters} / 200 characters`;
    wordCount.textContent = `${words} words`;

    charCount.classList.remove("warning", "over");

    if (characters > 200) {
        charCount.classList.add("over");
    } else if (characters > 180) {
        charCount.classList.add("warning");
    }
}

function saveDraft() {
    localStorage.setItem(DRAFT_KEY, noteText.value);
}

function clearNote() {
    noteText.value = "";

    updateCounters();

    localStorage.removeItem(DRAFT_KEY);
}

function loadDraft() {
    const savedDraft = localStorage.getItem(DRAFT_KEY);

    if (savedDraft !== null) {
        noteText.value = savedDraft;
    }

    updateCounters();
}

function applyTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light mode";
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "Dark mode";
    }
}

noteText.addEventListener("input", function () {
    updateCounters();
    saveDraft();
});

clearBtn.addEventListener("click", function () {
    clearNote();
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light mode";
        localStorage.setItem(THEME_KEY, "dark");
    } else {
        themeToggle.textContent = "Dark mode";
        localStorage.setItem(THEME_KEY, "light");
    }
});

noteText.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        clearNote();
    }
});

loadDraft();
applyTheme();