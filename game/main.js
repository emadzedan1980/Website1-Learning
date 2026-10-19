const questionElement = document.querySelector(".question");
const form = document.querySelector(".form");

const inputText = document.getElementById("inputText");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");
let state = {
  score: 0,
  wrongAnswers: 0,
};

function updateQuestion() {
  state.currentQuestion = generateAQuestion();
  questionElement.innerHTML = `${state.currentQuestion.firstNumber} ${state.currentQuestion.operator} ${state.currentQuestion.secondNumber}`;
  inputText.value = "";
  inputText.focus();
}
updateQuestion();

function generateNumber(min, max) {
  return Math.floor(Math.random() * max + min);
}
console.log("Generate A Number Between 1-10: " + generateNumber(1, 10));

function generateAQuestion() {
  return {
    firstNumber: generateNumber(1, 10),
    secondNumber: generateNumber(1, 10),
    operator: ["+", "-", "x"][generateNumber(0, 3)],
  };
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let correctAnswer;
  const Q = state.currentQuestion;
  if (Q.operator == "+") {
    correctAnswer = Q.firstNumber + Q.secondNumber;
  } else if (Q.operator == "-") {
    correctAnswer = Q.firstNumber - Q.secondNumber;
  } else if (Q.operator == "x") {
    correctAnswer = Q.firstNumber * Q.secondNumber;
  }

  if (parseInt(inputText.value, 10) === correctAnswer) {
    state.score++;
    pointsNeeded.textContent = 10 - state.score;
    renderProgressBar();
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = 2 - state.wrongAnswers;
    questionElement.classList.add("animate-worng");
    setTimeout(() => questionElement.classList.remove("animate-worng"), 451);
  }
  checkLogic();
  updateQuestion();
}
function checkLogic() {
  //if you won
  if (state.score === 10) {
    endMessage.textContent = "Congrats, You Won!";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
  //if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = "Sorry, You Lost!";
    document.body.classList.add("overlay-is-open");
    setTimeout(() => resetButton.focus(), 331);
  }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  document.body.classList.remove("overlay-is-open");
  updateQuestion();
  state.score = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = 10;
  mistakesAllowed.textContent = 2;
  renderProgressBar();
}
function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`;
}
