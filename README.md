# Flip It Out - Memory Game

This is a memory game implemented in HTML, CSS, and JavaScript. Players flip cards to find matching pairs. The game features different themes, difficulty levels, sound effects, and a leaderboard to track high scores.

## Features

  - **Multiple Themes:** Choose from animal, fruit, or number themes.
  - **Difficulty Levels:** Play on easy (4x4), medium (6x6), or hard (8x8) grids.
  - **Move Counter:** Tracks the number of moves taken.
  - **Timer:** Measures the time taken to complete the game.
  - **Sound Effects:** Includes sounds for card flipping, matching, starting, and ending the game.
  - **Leaderboard:** Saves and displays high scores for each difficulty level.
  - **Settings:** Allows players to mute/unmute game sounds.
  - **Local Storage:** Uses local storage to save game settings and high scores.
  - **Responsive Design:** Adapts to different screen sizes.

## How to Play

1.  **Choose a Theme:** Select a theme from the dropdown menu (Animals, Fruits, or Numbers).
2.  **Select Difficulty:** Choose a difficulty level (Easy, Medium, or Hard).
3.  **Start the Game:** Click the "Start Game" button.
4.  **Flip Cards:** Click on the cards to reveal their icons.
5.  **Find Matches:** Match pairs of identical icons.
6.  **Complete the Game:** Match all pairs to win.
7.  **Save Your Score:** Enter your name to save your score to the leaderboard.
8.  **View Leaderboard:** Check the leaderboard to see the high scores for each difficulty.
9.  **Adjust Settings:** Mute or unmute game sounds in the settings page.

## Files

  - `index.html`: The main game page.
  - `leaderboard.html`: The leaderboard page.
  - `instructions.html`: The instructions page.
  - `settings.html`: The settings page.
  - `script.js`: The JavaScript file containing the game logic.
  - `style.css`: The CSS file for styling the game.
  - `sounds/`: Directory containing sound files.

## Setup

1.  **Clone the Repository:** Clone this repository to your local machine.
2.  **Open `index.html`:** Open the `index.html` file in your web browser.

## Technologies Used

  - HTML5
  - CSS3
  - JavaScript
  - Local Storage (for saving game settings and scores)

## JavaScript Functions

  - `startGame()`: Starts or restarts the game.
  - `generateCards()`: Generates and shuffles the cards.
  - `setBoardSize(difficulty)`: Sets the board size based on the difficulty level.
  - `flipCard(card)`: Handles the card flipping logic.
  - `formatTime(sec)`: Formats time in seconds to "MM:SS" format.
  - `saveScore(moves, timeInSec)`: Saves the player's score to local storage.
  - `shuffle(array)`: Shuffles an array.
  - `hasClass(el, cls)`: Checks if an element has a specific class.
  - `muteSounds()`: Mutes game sounds.
  - `unmuteSounds()`: Unmutes game sounds.
  - `window.onload`: Initializes game settings and displays leaderboard.

## Customization

  - **Themes:** You can add more themes by adding arrays to the `themes` object in `script.js`.
  - **Sounds:** Replace the sound files in the `sounds/` directory with your own.
  - **Styling:** Modify the `style.css` file to change the appearance of the game.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues for bugs or feature requests.

