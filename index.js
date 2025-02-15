var words = [
    "bananas",
    "grapes",
    "carousel",
    "milkshake",
    "javascript",
    "limousine",
    "chocolate",
    "programming",
    "meatloaf",
    "ukulele",
    "mango",
];

// declare variables

var wordToGuessEl = document.getElementById("word-to-guess");
var previousWordEl = document.getElementById("previous-word");
var incorrectLettersEl = document.getElementById("incorrect-letters");
var remainingGuessesEl = document.getElementById("remaining-guesses");
var scoreEl = document.getElementById("score");
var winsEl = document.getElementById("wins");
var lossesEl = document.getElementById("losses");

var wins = 0;
var losses = 0;
var incorrectLetters = [];
var remainingGuesses = 10;
remainingGuessesEl.textContent = remainingGuesses;
var wordToGuess = "";
var atLeastOneKeyPressed = false;
var currentWord = "";
// Randomly assign a word from words list to #word-to-guess per page load

// console.log(
//     (atLeastOneKeyPressed && remainingGuessesEl.textContent != 0) ||
//         wordToGuessEl.textContent.includes("_")
// );
newGame();

function newGame() {
    incorrectLetters = [];
    incorrectLettersEl.textContent = incorrectLetters;
    remainingGuesses = 10;
    remainingGuessesEl.textContent = remainingGuesses;
    wordToGuess = "";
    wordToGuessEl.textContent = "";

    atLeastOneKeyPressed = false;
    previousWordEl.textContent = currentWord;

    do {
        wordToGuess = words[Math.floor(Math.random() * words.length)];
        currentWord = wordToGuess;
        wordToGuessLength = wordToGuess.length;

        while (wordToGuessLength > 0) {
            wordToGuessEl.textContent += "_";
            wordToGuessLength--;
        }
        console.log(wordToGuess);
        console.log(wordToGuessEl.textContent);

        // keypress
        document.onkeyup = function (e) {
            atLeastOneKeyPressed = true;
            console.log(e.key);
            var key = e.key.toLocaleLowerCase();
            var wordMatch = false;
            // console.log(wordToGuess + " " + wordToGuess.length);
            //https://www.geeksforgeeks.org/how-to-iterate-over-characters-of-a-string-in-javascript/

            var displayedWordArr = wordToGuessEl.textContent.split("");

            wordToGuess.split("").forEach((letter, index) => {
                if (key == letter) {
                    wordMatch = true;
                    // console.log(e.key + " is correct. Index: " + index);
                    wordToGuess.replace(letter, "");
                    displayedWordArr[index] = letter;
                } else {
                    // console.log(e.key + " is incorrect. Index: " + index);
                }
            });

            // console.log(displayedWordArr.join(""));
            wordToGuessEl.textContent = displayedWordArr.join("");

            console.log(wordMatch);
            //https://www.geeksforgeeks.org/javascript-program-to-check-if-a-string-contains-only-alphabetic-characters/

            if (
                wordMatch == false &&
                !incorrectLetters.includes(key) &&
                /^[a-z]+$/.test(key) &&
                e.key.length == 1
            ) {
                incorrectLetters.push(key);
                remainingGuesses -= 1;
            } else
                console.log(e.key + " is already in the list or not a letter");
            remainingGuessesEl.textContent = remainingGuesses;
            incorrectLettersEl.textContent = incorrectLetters;
            if (!wordToGuessEl.textContent.includes("_")) {
                wins++;
                newGame();
            } else if (remainingGuessesEl.textContent == 0) {
                losses++;
                newGame();
            }
            winsEl.textContent = wins;
            lossesEl.textContent = losses;
        };
    } while (
        atLeastOneKeyPressed &&
        (remainingGuessesEl.textContent != 0 ||
            wordToGuessEl.textContent.includes("_"))
    );
}
