window.onload = function() {
    var scores = JSON.parse(localStorage.getItem("scores") );
    var leaderboardContainer = document.getElementById("leaderboardContainer");
    for (var difficulty in scores) {
    if (scores[difficulty].length > 0) {
        var header = document.createElement("h3");
        header.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1) + " Difficulty";
        leaderboardContainer.appendChild(header);
        var list = document.createElement("ul");
        scores[difficulty].sort(function(a, b) {
        if (a.moves === b.moves) {
            return a.time - b.time;
        }
        return a.moves - b.moves;
        });
        scores[difficulty].forEach(function(score) {
        var listItem = document.createElement("li");
        listItem.textContent = score.name + " | Moves: " + score.moves + " | Time: " + formatTime(score.time);
        list.appendChild(listItem);
        });
        leaderboardContainer.appendChild(list);
    }
    }
    if (!leaderboardContainer.hasChildNodes()) {
    leaderboardContainer.innerHTML = "<p>No scores yet. Play the game and your score will appear here!</p>";
    }
};
function formatTime(sec) {
    var m = ("0" + Math.floor(sec / 60)).slice(-2);
    var s = ("0" + (sec % 60)).slice(-2);
    return m + ":" + s;
}