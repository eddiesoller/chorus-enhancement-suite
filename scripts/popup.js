let starredUsers = [];
const usernameInput = document.getElementById("username");
const addBtn = document.getElementById("add");
const starredUsersDiv = document.getElementById("starredUsers");

chrome.storage.sync.get("starredUsers", function(data) {
    if (data.starredUsers) {
        starredUsers = data.starredUsers;
        renderStarredUsers();
    }
})

addBtn.addEventListener("click", function() {
    if (usernameInput.value) {
        if (!starredUsers.map(user => user.toLowerCase()).includes(usernameInput.value.toLowerCase())) {
            starredUsers.push(usernameInput.value);
            saveStarredUsers();
            renderStarredUsers();
        }
    }
})

function saveStarredUsers() {
    chrome.storage.sync.set({
        "starredUsers": starredUsers,
        function() {
            console.log("starredUsers storage saved");
        }
    });
}

function renderStarredUsers() {
    starredUsersDiv.innerHTML = "";

    chrome.storage.sync.get("starredUsers", function(data) {
        for (let i = 0; i < data.starredUsers.length; i++) {
            const userDiv = document.createElement("div");
            userDiv.style = "user";
            const deleteBtn = document.createElement("button");
            deleteBtn.style = "deleteBtn";
            deleteBtn.innerText = "-";
            deleteBtn.addEventListener("click", function() {
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

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};