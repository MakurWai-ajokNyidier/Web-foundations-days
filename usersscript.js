const API_URL = "https://jsonplaceholder.typicode.com/users";

let users = [];

const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const status = document.querySelector("#status");
const usersList = document.querySelector("#users-list");


function renderUsers(list) {
    usersList.innerHTML = "";

    list.forEach(function (user) {
        const listItem = document.createElement("li");

        const name = document.createElement("strong");
        name.textContent = user.name;

        const email = document.createElement("span");
        email.textContent = ` | Email: ${user.email}`;

        const city = document.createElement("span");
        city.textContent = ` | City: ${user.address.city}`;

        const company = document.createElement("span");
        company.textContent = ` | Company: ${user.company.name}`;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    });
}


async function loadUsers() {
    loadButton.disabled = true;
    status.textContent = "Loading users...";
    usersList.innerHTML = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        users = await response.json();

        renderUsers(users);

        status.textContent = `Successfully loaded ${users.length} users.`;
    } catch (error) {
        console.error("Error loading users:", error);

        status.textContent =
            "Error loading users. Please try again.";
    } finally {
        loadButton.disabled = false;
    }
}


loadButton.addEventListener("click", loadUsers);


filterInput.addEventListener("input", function () {
    const searchText = filterInput.value.trim().toLowerCase();

    const filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchText);
    });

    renderUsers(filteredUsers);
});
