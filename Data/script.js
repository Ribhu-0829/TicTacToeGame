const boxes = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".resetBtn");
const msgBox = document.querySelector(".msg-container");

let turnX = true;
let boxCount = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerHTML = "X";
      turnX = false;
    } else {
      box.innerHTML = "O";
      turnX = true;
    }
    box.disabled = true;
    boxCount++;
    checkWin();
  });
});

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
    boxCount = 0;
    msgBox.style.display = "none";
    box.style.background = 'rgba(0,0,0,0.2)';
  });
});

function checkWin() {
  for (pattern of winPatterns) {
    let box1Val = boxes[pattern[0]].innerText;
    let box2Val = boxes[pattern[1]].innerText;
    let box3Val = boxes[pattern[2]].innerText;

    if (box1Val === "" || box2Val === "" || box3Val === "") continue;
    if (box1Val === box2Val && box2Val === box3Val) {
        let color = `rgba(255,255,255,0.3)`
        boxes[pattern[0]].style.background = color
        boxes[pattern[1]].style.background = color
        boxes[pattern[2]].style.background = color

      if (!turnX) {
        msgOut("X WON");
        disableBox();
      } else {
        msgOut("O WON");
        disableBox();
      }
      return
    }
  }
  if (boxCount >= 9) {
    disableBox();
    msgOut("DRAW");
  }
}

function msgOut(msg) {
  msgBox.style.display = "block";
  msgBox.innerText = msg;
  return setTimeout(() => {
    msgBox.style.display = "none";
  }, 10000);
}

function disableBox() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}
