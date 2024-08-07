let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".resetButton");
let newGameButton = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector(".msg");
let turnO = true;

const winningPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const drawGame = () => {
    msg.innerHTML = "Game Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const checkBoxes = () => {
    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i].innerText === "") {
            return false;
        }
    }
    return true;
}

for(let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", () => {
        if(turnO) {
            boxes[i].innerText = "O";
            turnO = false;
        } else {
            boxes[i].innerText = "X";
            turnO = true;
        }
        boxes[i].disabled = true;
        checkWinner();
        let notEmpty = checkBoxes();

        if(!checkWinner() && notEmpty) {
            drawGame();
        }
    });
}

function showWinner(winner) {
    msg.innerHTML = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winningPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false; 
}

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

// Add a draw game feature (Added)