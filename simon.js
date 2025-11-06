let gameSeq = []; //sequence of the game
let userSeq = []; //sequence of the game that is "user playing"

let btns = ["yellow", "red", "blue", "green"]; //array of buttons

let started = false;
let level = 0; //by default, level = 0
let h2 = document.querySelector("h2");

// event listener added for "keypress"
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started"); //check console for this.
    started = true;

    // increment in level via "leveUp() function"
    levelUp();
  }
});

// game flashing, which btn is press
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// user flashing, which button is user pressing
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

// levelUp() for increment in levels
function levelUp() {
  userSeq = []; //user started the game rightnow!
  level++;
  //at h2 the level no's is displaying
  h2.innerHTML = `Level ${level}`;

  //for fleshing the random btn in the game
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

// checkAns() for matching the game flesh and user flesh
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `GAME OVER! Your score was <b>${level}</b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// reset() for resetting the game to level 0
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
