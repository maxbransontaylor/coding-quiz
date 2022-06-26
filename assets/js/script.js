var counter = 0;
var timer = document.querySelector("#counter");
var mainBodyEl = document.querySelector("body");
var startScreenEl = "";
var questionEL = "";
var questionNameEl = "";
endScreenEl = "";
var questionCounter = 0;
var rightOrWrong = "";
var gameOver = false;
var highscores = [];
var questions = [
  {
    name: "String values must be enclosed within ____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: "quotes",
  },
  {
    name: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
    correct: "console.log",
  },
  {
    name: "Commonly used data types do NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    name: "The condition in an if/else statement is enclosed with _________.",
    options: ["parenthesis", "quotes", "curly brackets", "square brackets"],
    correct: "parenthesis",
  },
  {
    name: "Arrays in JavaScript can be used to store _______.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: "all of the above",
  },
];
var initialScene = function () {
  counter = 0;
  startScreenEl = document.createElement("div");
  startScreenEl.className = "start-screen";
  startScreenEl.innerHTML =
    "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p><button class ='btn' id= 'startbtn'>Start game</button>";
  mainBodyEl.appendChild(startScreenEl);
};
var gameStartHandler = function (event) {
  var targetEl = event.target;
  if (targetEl.matches("#startbtn")) {
    return startGame();
  } else {
    return false;
  }
};
var generateQuestion = function () {
  questionNameEl.textContent = questions[questionCounter].name;
  for (var i = 0; i < 4; i++) {
    var answerChoice = document.querySelector("#option" + i);
    answerChoice.textContent = questions[questionCounter].options[i];
  }
};

var startGame = function () {
  gameOver = false;
  startScreenEl.remove();
  questionEL = document.createElement("div");
  questionNameEl = document.createElement("h1");
  questionEL.appendChild(questionNameEl);
  var orderedListEl = document.createElement("ol");

  for (var i = 0; i < 4; i++) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "options";
    listItemEl.id = "option" + i;
    orderedListEl.appendChild(listItemEl);
  }
  questionEL.appendChild(orderedListEl);
  rightOrWrong = document.createElement("h2");

  mainBodyEl.appendChild(questionEL);
  rightOrWrong.id = "rightwrong";
  mainBodyEl.appendChild(rightOrWrong);
  generateQuestion();
  counter = 60;
  timer.textContent = counter;
  t = setInterval(function () {
    if (counter > 0 && !gameOver) {
      counter--;
      timer.textContent = Math.max(0, counter);
    } else if (gameOver) {
      clearInterval(t);
    } else {
      clearInterval(t);
      endGame();
    }
  }, 1000);
};
var nextQuestion = function (event) {
  event.stopPropagation();
  targetEl = event.target;
  console.log(targetEl);
  if (targetEl.matches(".options")) {
    if (questionCounter < questions.length - 1) {
      if (targetEl.textContent === questions[questionCounter].correct) {
        rightOrWrong.textContent = "Correct!";
      } else {
        rightOrWrong.textContent = "Incorrect!";
        counter -= 10;
        timer.textContent = Math.max(0, counter);
      }

      questionCounter++;
      generateQuestion();
    } else {
      gameOver = true;
      endGame();
    }
  }
};
var endGame = function () {
  questionEL.remove();
  endScreenEl = document.createElement("div");
  endScreenEl.innerHTML =
    "<h1>All done!</h1><p>Your final score is " +
    counter +
    "</p><form><input type='text' name='initials' placeholder='Enter Your Initials' /><button class='btn' id='save-initials'>Submit</button>";
  mainBodyEl.appendChild(endScreenEl);
};
var submitScoreHandler = function (event) {
  event.preventDefault();
  var savedScores = localStorage.getItem("highscores") || [];
  console.log(savedScores);
  if (savedScores) {
    highscores = savedScores;
  }
  var initials = document.querySelector("input[name='initials']").value;
  var highScoreObj = { name: initials, score: counter };
  highscores.push(highScoreObj);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  endScreenEl.remove();
  window.location = "highscores.html";
};

initialScene();
startScreenEl.addEventListener("click", gameStartHandler);
mainBodyEl.addEventListener("click", nextQuestion);
mainBodyEl.addEventListener("submit", submitScoreHandler);
