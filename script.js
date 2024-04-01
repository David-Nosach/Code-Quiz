// Selecting elements from the HTML document
const startBtn = document.getElementById("startBtn");
const quizTitle = document.getElementById("quizTitle");
const instructions = document.getElementById("instructions");
const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const answerMessage = document.getElementById("answerMessage");
const endGameContainer = document.getElementById("endGame");
const endGameTitle = document.getElementById("endGameTitle");
const finalScoreElement = document.getElementById("finalScore");
const initialsInput = document.getElementById("initials");
const submitScoreBtn = document.getElementById("submitScore");
const highScoresContainer = document.getElementById("highScores");
const playAgainBtn = document.getElementById("playAgain");
const clearScoresBtn = document.getElementById("clearScores");
const viewHighScoresLink = document.getElementById("viewHighScores");
const timerElement = document.getElementById("timer");

// Array of quiz questions
const questions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["variable x;", "var x;", "v x;", "x = var;"],
    answer: "var x;",
  },
  {
    question:
      "Which method is used to add a key-value pair to local storage in JavaScript?",
    options: [
      "localStorage.setItem(key, value)",
      "localStorage.add(key, value)",
      "localStorage.append(key, value)",
      "localStorage.addPair(key, value)",
    ],
    answer: "localStorage.setItem(key, value)",
  },
  {
    question: "What is the purpose of JSON.stringify() in JavaScript?",
    options: [
      "To convert a JavaScript object into a JSON string",
      "To parse a JSON string into a JavaScript object",
      "To add a key-value pair to a JSON object",
      "To remove a key-value pair from a JSON object",
    ],
    answer: "To convert a JavaScript object into a JSON string",
  },
  {
    question:
      "Which method is used to retrieve a value from local storage in JavaScript?",
    options: [
      "localStorage.getItem(key)",
      "localStorage.getValue(key)",
      "localStorage.fetch(key)",
      "localStorage.retrieve(key)",
    ],
    answer: "localStorage.getItem(key)",
  },
  {
    question:
      "What happens if you try to store a non-string value in local storage without converting it?",
    options: [
      "It gets automatically converted to a string",
      "It raises an error",
      "It gets stored as is",
      "It gets converted to null",
    ],
    answer: "It gets automatically converted to a string",
  },
];

// Global variables
let currentQuestionIndex = 0;
let timer;
let score = 0;

// Event listeners for buttons and links
startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);
playAgainBtn.addEventListener("click", function () {
  startQuiz();
  document.getElementById("highScoresContainer").classList.add("hidden");
});
clearScoresBtn.addEventListener("click", clearHighScores);
viewHighScoresLink.addEventListener("click", viewHighScores);

// Function to start the quiz
function startQuiz() {
  // Hide quiz title and instructions, show question container
  quizTitle.classList.add("hidden");
  instructions.classList.add("hidden");
  startBtn.style.display = "none";
  questionContainer.classList.remove("hidden");
  endGameContainer.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 60; // Initial score set to 60 seconds
  answerMessage.innerText = ""; // Clear previous answer message
  displayQuestion(); // Display the first question
  startTimer(); // Start the timer
  // Remove the "hidden" class from the initials section
  document.getElementById("initialsSection").classList.remove("hidden");
}

// Function to display the current question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  // Create buttons for each option
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => answerQuestion(option));
    optionsElement.appendChild(button);
  });
}

// Function to handle user's answer to the question
function answerQuestion(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    answerMessage.innerHTML = "<span class='correct'>Correct!</span>";
  } else {
    answerMessage.innerHTML = "<span class='wrong'>Wrong!</span>";
    score -= 10; // Deduct 10 seconds for wrong answer
    if (score < 0) score = 0; // Ensure score does not go negative
  }

  // Move to the next question or end the quiz after a delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      answerMessage.innerHTML = "";
      displayQuestion();
    } else {
      endGame();
    }
  }, 1000); // Delay before moving to the next question or ending the game
}

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    if (score > 0) {
      score--;
      displayScore();
    } else {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Function to display the current score
function displayScore() {
  timerElement.innerText = score + "s";
}

// Function to end the quiz
function endGame() {
  clearInterval(timer);
  questionContainer.classList.add("hidden");
  endGameContainer.classList.remove("hidden");
  finalScoreElement.innerText = score + "s";
  endGameTitle.innerText = "All Done!";
  // Hide the initials section if the high scores page is being displayed
  if (
    document.getElementById("highScoresContainer").classList.contains("hidden")
  ) {
    document.getElementById("initialsSection").classList.remove("hidden");
  } else {
    document.getElementById("initialsSection").classList.add("hidden");
  }
}

// Function to submit the user's score
function submitScore() {
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    initialsInput.value = "";
    viewHighScores();
  }
}

// Function to display the high scores
function viewHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.sort((a, b) => b.score - a.score);
  highScoresContainer.innerHTML = "";
  highScores.forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${index + 1}. ${entry.initials}: ${entry.score}s`;
    highScoresContainer.appendChild(listItem);
  });
  endGameContainer.classList.add("hidden");
  questionContainer.classList.add("hidden");
  startBtn.style.display = "none";
  document.getElementById("highScoresContainer").classList.remove("hidden");
  // Stop the timer when the high scores page is displayed
  clearInterval(timer);
}

// Function to clear the high scores
function clearHighScores() {
  localStorage.removeItem("highScores");
  highScoresContainer.innerHTML = "";
}
