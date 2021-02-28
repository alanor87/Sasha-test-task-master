const refs = {
  mainBoard: document.querySelector(".main-board"),
  allCells: Array.from(document.querySelectorAll(".cell")),
  playerScore: document.querySelector(".score-player"),
  compScore: document.querySelector(".score-comp"),
};

let currentCheckedCell;
let compScore = 0;
let playerScore = 0;
let counter = 0;
let playerClicked = false;

function randomNumber(range) {
  return Math.floor(Math.random() * range);
}

function autoCellCheck() {
  if (currentCheckedCell) {
    currentCheckedCell.classList.remove("checked");
    currentCheckedCell.dataset.isChecked = "false";
    currentCheckedCell.removeEventListener("click", playerCellCheck);
  }
  currentCheckedCell = refs.allCells[randomNumber(24)];
  currentCheckedCell.classList.add("checked");
  currentCheckedCell.dataset.isChecked = "true";
  currentCheckedCell.addEventListener("click", playerCellCheck);
}

function playerCellCheck(event) {
  if (event.target.dataset.isChecked === "true") {
    playerClicked = true;
    playerScore += 1;
    refs.playerScore.textContent = playerScore;
  }
  event.target.removeEventListener("click", playerCellCheck);
}

function cycle() {
  console.log(counter);
  compScore = counter - playerScore;
  refs.compScore.textContent = compScore;
  if (counter > 9) {
    console.log("finish");
    currentCheckedCell.removeEventListener("click", playerCellCheck);
    clearInterval(interval);
    return;
  }
  autoCellCheck();
  playerClicked = false;
  counter += 1;
}

const interval = setInterval(cycle, 1500);
