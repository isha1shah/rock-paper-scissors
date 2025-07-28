let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara= document.querySelector("#user-score");
const compScorePara= document.querySelector("#comp-score");

const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";

  msg.innerText = "Play your move";
  msg.style.backgroundColor = "black";


  msg.classList.add("blink");
  setTimeout(() => {
    msg.classList.remove("blink");
  }, 1000); 
  choices.forEach(choice => {
    choice.style.pointerEvents = "auto";
    choice.style.opacity = "1";
  });
 });

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randInx = Math.floor(Math.random() * 3);
  return options[randInx];
};

const drawGame = () => {
  console.log("Game was draw");
  msg.innerText = "Game was a Draw. Play Again!";
  msg.style.backgroundColor = "black";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    userScore++;
    userScorePara.innerText=userScore;
  } else {
    msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    compScore++;
    compScorePara.innerText=compScore;
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "scissors") {
      userWin = compChoice === "rock" ? false : true;
    }

    showWinner(userWin, userChoice, compChoice);
  }
   if (userScore === 5 || compScore === 5) {
    const winner = userScore === 5 ? "🎉 You won the match! 🏆👏" : "💻 Computer won the match! 😞";
    msg.innerText = winner;
    msg.style.backgroundColor = userScore === 5 ? "blue" : "brown";

    // Disable choices
    choices.forEach(choice => {
      choice.style.pointerEvents = "none";
      choice.style.opacity = "0.6"; 
    });
  }
};

// Setup listeners for each choice button
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});