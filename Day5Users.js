const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

let users = [];

async function loadUsers() {
    loadButton.disabled = true;
    status.textContent = "Loading users...";
    usersList.replaceChildren();

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }

        users = await response.json();
        renderUsers(users);

        status.textContent = `Loaded ${users.length} users successfully.`;
    } catch (error) {
        users = [];
        status.textContent = "Error loading users. Please try again.";
        console.error(error);
    } finally {
        loadButton.disabled = false;
    }
}

function renderUsers(list) {
    usersList.replaceChildren();

    if (list.length === 0) {
        status.textContent = "No users match your filter.";
        return;
    }

    list.forEach(user => {
        const item = document.createElement("li");
        const name = document.createElement("h3");
        const email = document.createElement("p");
        const city = document.createElement("p");
        const company = document.createElement("p");

        name.textContent = user.name;
        email.textContent = `Email: ${user.email}`;
        city.textContent = `City: ${user.address.city}`;
        company.textContent = `Company: ${user.company.name}`;

        item.append(name, email, city, company);
        usersList.appendChild(item);
    });
}

loadButton.addEventListener("click", loadUsers);

const removeButton = document.getElementById("remove-users");
removeButton.addEventListener("click", () => {
    users = [];
    usersList.replaceChildren();
    filterInput.value = "";
    status.textContent = "All users have been removed.";
});
filterInput.addEventListener("input", () => {
    const query = filterInput.value.toLowerCase().trim();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query)
    );

    renderUsers(filteredUsers);
});