let starredUsers = [];

chrome.storage.sync.get('starredUsers', data => {
    if (data.starredUsers) {
        starredUsers = data.starredUsers.map(user => user.toLowerCase());
    }
})

$(document).ready(() => {
    $("li.message").each((index, element) => {
        const postAuthor = $(element).attr("data-author");
        if (starredUsers.includes(postAuthor.toLowerCase())) {
            $("<span class='cesIcon starredUserPost'>⭐</span>").insertBefore($(element).find("div.postHeader > a.datePermalink"));
        }

        const manyLikes = $(element).find("span.LikeText > a.OverlayTrigger").get().length > 0;
        if (manyLikes) {
            $("<span class='cesIcon manyLikesPost'>❤️</span>").insertBefore($(element).find("div.postHeader > a.datePermalink"));
        }
    });
});