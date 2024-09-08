// Define the list of words to choose from
const words = [
  'JAVASCRIPT',
  'HTML',
  'CSS',
  'NODE',
  'REACT',
  'ANGULAR',
  'JQUERY',
  'VUE'
];

const maxWrongGuesses = 6;
let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

// Select random word from the list
function selectRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Initialize the game
function initializeGame() {
  wordToGuess = selectRandomWord();
  guessedLetters = Array(wordToGuess.length).fill('_');
  wrongGuesses = 0;

  // Update the word display
  updateWordDisplay();
  updateMeltingSnowmanGraphic();

  // Remove any previously generated buttons
  const lettersContainer = document.querySelector('.letters');
  while (lettersContainer.firstChild) {
    lettersContainer.removeChild(lettersContainer.firstChild);
  }

  // Generate the letter buttons
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const button = document.createElement('button');
    button.innerText = letter;
    button.addEventListener('click', function () {
      handleGuess(letter);
    });
    lettersContainer.appendChild(button);
  }

  // Clear any previous win/lose message
  const messageContainer = document.querySelector('.message');
  messageContainer.innerText = '';

  // Add event listener for keyboard input
  window.addEventListener('keydown', handleKeyPress);
}

// Update the word display
function updateWordDisplay() {
  const wordContainer = document.querySelector('.word');
  wordContainer.innerText = guessedLetters.join(' ');
}

// Handle a letter guess (from button click or key press)
function handleGuess(letter) {
  // If the letter has already been guessed, do nothing
  if (guessedLetters.includes(letter)) {
    return;
  }

  let correctGuess = false;
  
  // Add the letter to the list of guessed letters if it's in the word
  guessedLetters.forEach((guessedLetter, index) => {
    if (wordToGuess[index] === letter) {
      guessedLetters[index] = letter;
      correctGuess = true;
    }
  });

  // If the letter is not in the hidden word, increment wrong guesses count and update Melting Snowman graphic
  if (!correctGuess) {
    wrongGuesses++;
    updateMeltingSnowmanGraphic();
  }

  // Update the word display
  updateWordDisplay();

  // Check if the game has been won or lost
  checkWinOrLose();
}

// Handle key press event
function handleKeyPress(event) {
  const letter = event.key.toUpperCase();
  
  // Ensure only A-Z keys are processed
  if (letter >= 'A' && letter <= 'Z') {
    handleGuess(letter);
  }
}

// Update the Melting Snowman graphic
function updateMeltingSnowmanGraphic() {
  const meltingSnowmanContainer = document.querySelector('.MeltingSnowman');
  meltingSnowmanContainer.innerHTML = `<img src="images/MeltingSnowman${imageCount}.png" alt="MeltingSnowman ${imageCount}">`;
  imageCount++;
}

// Check if the game has been won or lost
function checkWinOrLose() {
  if (guessedLetters.join('') === wordToGuess) {
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = 'You win!';
    disableButtons();
  } else if (wrongGuesses >= maxWrongGuesses) {
    const messageContainer = document.querySelector('.message');
    messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
    const meltingSnowmanContainer = document.querySelector('.MeltingSnowman');
    meltingSnowmanContainer.innerHTML = `<img src="images/gameover.png" alt="gameover">`;
    disableButtons();
  }
}

// Disable letter buttons after game ends
function disableButtons() {
  const letterButtons = document.querySelectorAll('.letters button');
  letterButtons.forEach(button => {
    button.disabled = true;
  });

  // Remove the keyboard event listener to prevent further input
  window.removeEventListener('keydown', handleKeyPress);
}

// Initialize the game when the page loads
window.addEventListener('load', initializeGame);
