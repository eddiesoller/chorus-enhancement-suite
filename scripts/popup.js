let starredUsers = [];
const usernameInput = document.getElementById("username");
const addBtn = document.getElementById("add");
const starredUsersDiv = document.getElementById("starredUsers");

chrome.storage.sync.get("starredUsers", data => {
    if (data.starredUsers) {
        starredUsers = data.starredUsers;
        renderStarredUsers();
    }
})

addBtn.addEventListener("click", () => {
    if (usernameInput.value) {
        if (!starredUsers.map(user => user.toLowerCase()).includes(usernameInput.value.toLowerCase())) {
            starredUsers.push(usernameInput.value);
            saveStarredUsers();
            renderStarredUsers();
        }
    }
})

const saveStarredUsers = () => {
    chrome.storage.sync.set({
        "starredUsers": starredUsers,
        function() {
            console.log("starredUsers storage saved");
        }
    });
}


const renderStarredUsers = () => {
    starredUsersDiv.innerHTML = "";

    chrome.storage.sync.get("starredUsers", (data) => {
        for (let i = 0; i < data.starredUsers.length; i++) {
            const userDiv = document.createElement("div");
            userDiv.style = "user";
            const deleteBtn = document.createElement("button");
            deleteBtn.style = "deleteBtn";
            deleteBtn.innerText = "-";
            deleteBtn.addEventListener("click", () => {
                starredUsers.remove(data.starredUsers[i]);
                saveStarredUsers();
                renderStarredUsers();
            });
            const usernameSpan = document.createElement("span");
            usernameSpan.innerText = data.starredUsers[i];
            userDiv.appendChild(deleteBtn);
            userDiv.appendChild(usernameSpan);
            starredUsersDiv.appendChild(userDiv);
        }
    });
}

Array.prototype.remove = function(...args) {
    for (let i = 0; i < args.length; i++) {
        let index = this.indexOf(args[i])

        while (index !== -1) {
            this.splice(index, 1)
            index = this.indexOf(args[i])
        }
    }
    return this;
};