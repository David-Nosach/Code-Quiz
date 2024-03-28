const startBtn = document.getElementById("startBtn");
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

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O", "W", "H2O", "H"],
    answer: "H2O",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "India", "Japan", "South Korea"],
    answer: "Japan",
  },
];

let currentQuestionIndex = 0;
let timer;
let score = 0;

startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);
playAgainBtn.addEventListener("click", function () {
  startQuiz();
  document.getElementById("highScoresContainer").classList.add("hidden");
});
clearScoresBtn.addEventListener("click", clearHighScores);
viewHighScoresLink.addEventListener("click", viewHighScores);

function startQuiz() {
  startBtn.style.display = "none";
  questionContainer.classList.remove("hidden");
  endGameContainer.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 60; // Initial score set to 60 seconds
  answerMessage.innerText = ""; // Clear previous answer message
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => answerQuestion(option));
    optionsElement.appendChild(button);
  });
}

function answerQuestion(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    answerMessage.innerText = "Correct!";
  } else {
    answerMessage.innerText = "Wrong!";
    score -= 10; // Deduct 10 seconds for wrong answer
    if (score < 0) score = 0; // Ensure score does not go negative
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      answerMessage.innerText = "";
      displayQuestion();
    }, 1000);
  } else {
    endGame();
  }
}

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

function displayScore() {
  timerElement.innerText = score + "s";
}

function endGame() {
  clearInterval(timer);
  questionContainer.classList.add("hidden");
  endGameContainer.classList.remove("hidden");
  finalScoreElement.innerText = score + "s";
  endGameTitle.innerText = "All Done!";
}

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
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  highScoresContainer.innerHTML = "";
}
