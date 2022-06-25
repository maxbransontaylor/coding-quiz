var counter = 0;
var bodyEl = document.querySelector("body");
var startScreenEl = "";
var questionEL = "";
var questionNameEl = "";
var questionCounter = 0;
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
  startScreenEl = document.createElement("div");
  startScreenEl.className = "start-screen";
  startScreenEl.innerHTML =
    "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p><button class ='btn' id= 'startbtn'>Start game</button>";
  bodyEl.appendChild(startScreenEl);
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
  bodyEl.appendChild(questionEL);
  generateQuestion();
  counter = 60;
  document.querySelector("#counter").textContent = counter;
  t = setInterval(function () {
    if (counter > 0) {
      counter--;
      document.querySelector("#counter").textContent = counter;
    } else {
      console.log("endgame");
      clearInterval(t);
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
        console.log("correct");
      } else {
        console.log("incorrect");
      }

      questionCounter++;
      generateQuestion();
    } else {
      console.log("DONE");
    }
  }
};
initialScene();
startScreenEl.addEventListener("click", gameStartHandler);
bodyEl.addEventListener("click", nextQuestion);
