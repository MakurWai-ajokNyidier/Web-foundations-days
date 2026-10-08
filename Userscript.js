const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

let users = [];

/**
 * Render an array of users on the page.
 */
function renderUsers(list) {
    // Clear the existing list
    usersList.innerHTML = "";

    // Show message when there are no matching users
    if (list.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No users match your filter.";
        usersList.appendChild(message);
        return;
    }

    // Create an element for each user
    list.forEach((user) => {
        const listItem = document.createElement("li");

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    });
}

/**
 * Load users from the API.
 */
async function loadUsers() {
    loadButton.disabled = true;
    status.textContent = "Loading users...";
    usersList.innerHTML = "";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        users = await response.json();

        renderUsers(users);

        status.textContent = `Successfully loaded ${users.length} users.`;

    } catch (error) {
        console.error("Error loading users:", error);

        status.textContent =
            "Error loading users. Please try again later.";

    } finally {
        loadButton.disabled = false;
    }
}

/**
 * Load users when the button is clicked.
 */
loadButton.addEventListener("click", loadUsers);

/**
 * Filter users whenever the user types in the filter box.
 */
filterInput.addEventListener("input", () => {
    const searchText = filterInput.value.trim().toLowerCase();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchText)
    );

    renderUsers(filteredUsers);
});