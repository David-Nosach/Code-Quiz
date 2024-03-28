const startBtn = document.getElementById("startBtn");
const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

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

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.style.display = "none";
  questionContainer.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.addEventListener("click", () => selectOption(option));
    optionsElement.appendChild(button);
  });
}

function selectOption(selectedOption) {
  const question = questions[currentQuestionIndex];
  if (selectedOption === question.answer) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert("Quiz finished!");
    // You can add code here to handle what happens when the quiz finishes
  }
}
