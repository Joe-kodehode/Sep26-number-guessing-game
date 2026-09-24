// Target existing HTML elements

const guessInput = document.querySelector("#guessInput");
const guessButton = document.querySelector("#guessButton");
const feedback = document.querySelector("#feedback");
const guessesLeftDisplay = document.querySelector("#guessesLeft");
const previousGuessesDisplay = document.querySelector("#previousGuesses");
const restartButton = document.querySelector("#restartButton");

// Declare global variables (used in multiple functions)
let randomNum, gueesesLeft, previousGuesses;

// Function to initialize the game on page load and when we click restart button
function initGame() {
  // Generate a random number between 1-100
  randomNum = Math.floor(Math.random() * 100) + 1;
  // reset guesses left variable
  guessesLeft = 10;
  // reset previous guesses variable
  previousGuesses = [];
  //  enable guessInput and guessButton
  guessButton.disabled = false;
  guessInput.disabled = false;
  // hide restartGame button
  restartButton.classList.toggle("display-none");
  // empty feedback and previousGuessesDisplay paragraphs
  feedback.textContent = "";
  previousGuessesDisplay.textContent = "";
  // reset guessesLeftDisplay to 10
  guessesLeftDisplay.textContent = `Guesses left: ${guessesLeft}`;
  // empty the input
  guessInput.value = "";
}

// function to run when we click guess button
function checkGuess() {
  // get the number the user has in the guessInput
  const userGuess = Number(guessInput.value);

  // compare user guess to the random number
  if (userGuess === randomNum) {
    feedback.textContent = `Congratulations! You guesses it right. The number was ${randomNum}`;
    endGame();
    return;
  }

  //   makes our difference a positive value, even if it was negative before
  const difference = Math.abs(userGuess - randomNum);

  if (difference <= 5) {
    feedback.textContent = "You're really close!";
  } else if (userGuess < randomNum) {
    feedback.textContent = "You're too low! Guess a higher number";
  } else {
    feedback.textContent = "You're too high! Guess a lower number";
  }

  // Update guesses left paragrpah
  guessesLeft--;
  guessesLeftDisplay.textContent = `Guesses left: ${guessesLeft}`;

  // Update previous guesses paragraph
  previousGuesses.push(userGuess);
  previousGuessesDisplay.textContent = `Previous Guesses: ${previousGuesses.join(", ")}`;

  // End the game if no guesses remain
  if (guessesLeft === 0) {
    feedback.textContent = `You lost! The number was: ${randomNum} Try again!`;
    endGame();
  }
}

// eventlistener on guess button to run checkGuess when clicked
guessButton.addEventListener("click", checkGuess);

// eventlistener on restart button to run initGame when clicked
restartButton.addEventListener("click", initGame);

// function to run if the game ends (win or lose)
function endGame() {
  guessButton.disabled = true;
  restartButton.classList.toggle("display-none");
  guessInput.disabled = true;
}
