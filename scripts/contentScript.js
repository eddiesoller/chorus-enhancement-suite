let starredUsers = [];

chrome.storage.sync.get('starredUsers', function(data) {
    starredUsers = data.starredUsers.map(user => user.toLowerCase());
})

$(document).ready(function() {
    $("li.message").each(function() {
        const postAuthor = $(this).attr("data-author");
        if (starredUsers.includes(postAuthor.toLowerCase())) {
            $("<span class='cesIcon starredUserPost'>⭐</span>").insertBefore($(this).find("div.postHeader > a.datePermalink"));
        }

        const manyLikes = $(this).find("span.LikeText > a.OverlayTrigger").get().length > 0;
        if (manyLikes) {
            $("<span class='cesIcon manyLikesPost'>❤️</span>").insertBefore($(this).find("div.postHeader > a.datePermalink"));
        }
    });
});