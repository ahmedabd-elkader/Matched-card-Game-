var startBtn = document.getElementById("startBtn");
var restartBtn = document.getElementById("restartBtn");
var board = document.getElementById("gameBoard");
var moveCounter = document.getElementById("moveCounter");
var timer = document.getElementById("timer");
var themeSelect = document.getElementById("themeSelect");
var difficultySelect = document.getElementById("difficultySelect");
var flipSound = document.getElementById("flipSound");
var matchSound = document.getElementById("matchSound");
var startSound = document.getElementById("startSound");
var endSound = document.getElementById("endSound");
var flipped = [];
var matched = [];
var interval;
var moves = 0;
var seconds = 0;
var themes = {
  animals: ["🐶", "🐱", "🐭", "🦊", "🐸", "🐵", "🐔", "🦁", "🐷", "🐨", "🐰", "🐮", "🐼", "🦄", "🐙", "🦉", "🐢", "🦕", "🐍", "🐦", "🦋", "🦀", "🦑", "🐧", "🦓", "🐊", "🐳", "🦜", "🐞", "🐝", "🪲", "🐬"],
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍", "🍑", "🍊", "🍈", "🥭", "🥥", "🍋", "🍐", "🍅", "🍆", "🌽", "🥒", "🥕", "🧄", "🧅", "🍠", "🥔", "🍞", "🥯", "🧀", "🥜", "🌰", "🥨", "🍪", "🍫", "🍬", "🍭"],
  numbers: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "➕", "➖", "➗", "✖️", "🧮", "🔠", "🔡", "🔤", "🔟", "🆎", "🆑", "🆘", "🔛", "🔝", "🔙", "🔚", "🔜", "🈁", "🈯", "🈲", "🈵"]
};
window.onload = function () {
  var savedDifficulty = localStorage.getItem("difficulty");
  if (savedDifficulty) {
    difficultySelect.value = savedDifficulty;
    setBoardSize(savedDifficulty);
  }
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    themeSelect.value = savedTheme;
  }
  if (localStorage.getItem("mute") === "true") {
    muteSounds();
  } else {
    unmuteSounds();
  }
};
startBtn.onclick = startGame;
restartBtn.onclick = startGame;
function startGame() {
  var selectedTheme = themeSelect.value;
  localStorage.setItem("theme", selectedTheme);
  var selectedDifficulty = difficultySelect.value;
  localStorage.setItem("difficulty", selectedDifficulty);
  setBoardSize(selectedDifficulty);
  startSound.play();
  moves = 0;
  seconds = 0;
  flipped = [];
  matched = [];
  moveCounter.textContent = "0";
  timer.textContent = "00:00";
  if (interval) clearInterval(interval);
  interval = setInterval(function () {
    seconds++;
    var mins = ("0" + Math.floor(seconds / 60)).slice(-2);
    var secs = ("0" + (seconds % 60)).slice(-2);
    timer.textContent = mins + ":" + secs;
  }, 1000);
  generateCards();
}
function generateCards() {
  board.innerHTML = "";
  var size = board.className.indexOf("medium") !== -1 ? 36 :
            board.className.indexOf("hard") !== -1 ? 64 : 16;
  var selectedTheme = localStorage.getItem("theme") ;
  var icons = themes[selectedTheme].slice(0, size / 2);
  var cards = icons.concat(icons);
  shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    var icon = cards[i];
    var card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-icon", icon);
    card.innerHTML = "card";
    card.onclick = (function (c) {
      return function () {
        flipCard(c);
      };
    })(card);
    board.appendChild(card);
  }
}
function setBoardSize(difficulty) {
  if (difficulty === "easy") {
    board.className = "board easy";
  } else if (difficulty === "medium") {
    board.className = "board medium";
  } else if (difficulty === "hard") {
    board.className = "board hard";
  }
}
function flipCard(card) {
  if (flipped.length >= 2 || hasClass(card, "flipped") || matched.indexOf(card) !== -1) return;
  flipSound.play();
  card.innerHTML = card.getAttribute("data-icon");
  card.className += " flipped";
  flipped.push(card);
  if (flipped.length === 2) {
    moves++;
    moveCounter.textContent = moves;
    var first = flipped[0];
    var second = flipped[1];
    if (first.getAttribute("data-icon") === second.getAttribute("data-icon")) {
      matchSound.play();
      matched.push(first, second);
      flipped = [];
      if (matched.length === board.children.length) {
        clearInterval(interval);
        endSound.play();
        alert("🎉 You won in " + moves + " moves and " + formatTime(seconds));
        saveScore(moves, seconds);
      }
    } else {
      setTimeout(function () {
        for (var i = 0; i < flipped.length; i++) {
          flipped[i].className = flipped[i].className.replace("flipped", "").trim();
          flipped[i].innerHTML = "card";
        }
        flipped = [];
      }, 800);
    }
  }
}
function formatTime(sec) {
  var m = ("0" + Math.floor(sec / 60)).slice(-2);
  var s = ("0" + (sec % 60)).slice(-2);
  return m + ":" + s;
}
function saveScore(moves, timeInSec) {
  var difficulty = localStorage.getItem("difficulty")  ;
  var scores = JSON.parse(localStorage.getItem("scores") || "{}");
  if (!scores[difficulty]) {
    scores[difficulty] = [];
  }
  var playerName = prompt("Congratulations! Please enter your name to save your score:");
  if (playerName) {
    scores[difficulty].push({
      name: playerName,
      moves: moves,
      time: timeInSec
    });
    localStorage.setItem("scores", JSON.stringify(scores));
    alert("Your score has been saved!");
  }
}
function shuffle(array) {
  var i, j, temp;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
function hasClass(el, cls) {
  return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
}
function muteSounds() {
  localStorage.setItem("mute", "true");
  flipSound.muted = true;
  matchSound.muted = true;
  startSound.muted = true;
  endSound.muted = true;
}
function unmuteSounds() {
  localStorage.setItem("mute", "false");
  flipSound.muted = false;
  matchSound.muted = false;
  startSound.muted = false;
  endSound.muted = false;
}
