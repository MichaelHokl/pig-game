let totalScoreP1 = 0;
let totalScoreP2 = 0;
let currentScore = 0;
let player1Active = true;
let gameActive = true;

const rollScoreP1 = document.getElementById("rolled-score-player-1");
const rollScoreP2 = document.getElementById("rolled-score-player-2");
const backgroundP1 = document.getElementById("player-1");
const backgroundP2 = document.getElementById("player-2");
const image = document.querySelector("img");
const resetRollBtn = document.getElementById("reset-roll-btn");
const addNumbersBtn = document.getElementById("add-numbers");
const h1 = document.querySelector(".main");
const totalScoreP1Text = document.getElementById("total-score-player-1");
const totalScoreP2Text = document.getElementById("total-score-player-2");

resetRollBtn.addEventListener("click", () => {
  if (!gameActive) {
    resetGame();
    return;
  }
  checkWinner();
  rollDice();
  updateCurrentScoreUI();
  backgroundChanger();
});

addNumbersBtn.addEventListener("click", () => {
  addCurrentScoreToTotal();
});

const rollDice = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  image.src = `Images/Dice-${randomNumber}.png`;
  currentScore += randomNumber;
  resetCurrentScoreIfOne(randomNumber);
};

const resetCurrentScoreIfOne = (rollValue) => {
  if (rollValue === 1) {
    currentScore = 0;
    playerChange();
  }
};

const updateCurrentScoreUI = () => {
  if (player1Active) {
    rollScoreP1.textContent = currentScore;
    rollScoreP2.textContent = 0;
  } else {
    rollScoreP1.textContent = 0;
    rollScoreP2.textContent = currentScore;
  }
};

const addCurrentScoreToTotal = () => {
  if (player1Active) {
    totalScoreP1 += currentScore;
    totalScoreP1Text.textContent = totalScoreP1;
    rollScoreP1.textContent = 0;
  } else {
    totalScoreP2 += currentScore;
    totalScoreP2Text.textContent = totalScoreP2;
    rollScoreP2.textContent = 0;
  }
  checkWinner();
  if (gameActive) {
    playerChange();
    backgroundChanger();
  }
  currentScore = 0;
};

const playerChange = () => {
  player1Active = !player1Active;
};

const checkWinner = () => {
  if (totalScoreP1 >= 100 || totalScoreP2 >= 100) {
    gameActive = false;
    h1.textContent = totalScoreP1 >= 100 ? "Player 1 Wins!" : "Player 2 Wins!";
    if (totalScoreP1 >= 100) {
      backgroundP1.classList.add("winner");
    } else {
      backgroundP2.classList.add("winner");
    }
    addNumbersBtn.style.display = "none";
    resetRollBtn.textContent = "Play Again";
  }
};

const resetGame = () => {
  currentScore = 0;
  totalScoreP1 = 0;
  totalScoreP2 = 0;
  gameActive = true;
  player1Active = true;
  addNumbersBtn.style.display = "inline-block";
  totalScoreP1Text.textContent = 0;
  totalScoreP2Text.textContent = 0;
  resetRollBtn.textContent = "Roll the Dice";
  h1.textContent = `Pig's Game`;
  backgroundP1.classList.remove("winner");
  backgroundP2.classList.remove("winner");
  backgroundChanger();
};

const backgroundChanger = () => {
  if (player1Active) {
    backgroundP2.classList.remove("active");
    backgroundP1.classList.add("active");
  } else {
    backgroundP1.classList.remove("active");
    backgroundP2.classList.add("active");
  }
};
