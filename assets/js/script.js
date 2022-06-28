//ended up creating all elements dynamically for practice,
//lots of empty variables so i could create the element in
//one function and clear it in another
var startScreenEl = "";
var questionEL = "";
var questionNameEl = "";
var endScreenEl = "";
var rightOrWrong = "";
var counter = 0;
var questionCounter = 0;
var timer = document.querySelector("#counter");
var mainBodyEl = document.querySelector("body");
var gameOver = false;
var highscores = [];
var questions = [
  {
    name: "String values must be enclosed within ____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    correct: "3. quotes",
  },
  {
    name: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correct: "4. console.log",
  },
  {
    name: "Commonly used data types do NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correct: "3. alerts",
  },
  {
    name: "The condition in an if/else statement is enclosed with _________.",
    options: [
      "1. parenthesis",
      "2. quotes",
      "3. curly brackets",
      "4. square brackets",
    ],
    correct: "1. parenthesis",
  },
  {
    name: "Arrays in JavaScript can be used to store _______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correct: "4. all of the above",
  },
];
//creates and loads start screen
var initialScene = function () {
  counter = 0;
  startScreenEl = document.createElement("div");
  startScreenEl.className = "start-screen";
  startScreenEl.innerHTML =
    "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds! </p><button class ='btn' id= 'startbtn'>Start game</button>";
  mainBodyEl.appendChild(startScreenEl);
};
//handler for start game button
var gameStartHandler = function (event) {
  var targetEl = event.target;
  if (targetEl.matches("#startbtn")) {
    return startGame();
  } else {
    return false;
  }
};
//replaces text in questionEl with the question indicated by questionCounter
var generateQuestion = function () {
  questionNameEl.textContent = questions[questionCounter].name;
  for (var i = 0; i < 4; i++) {
    var answerChoice = document.querySelector("#option" + i);
    answerChoice.textContent = questions[questionCounter].options[i];
  }
};

var startGame = function () {
  //reset game state and remove start screen
  gameOver = false;
  startScreenEl.remove();
  //create contents of questionEl
  questionEL = document.createElement("div");
  questionNameEl = document.createElement("h1");
  questionEL.appendChild(questionNameEl);
  var orderedListEl = document.createElement("ol");
  orderedListEl.id = "question list";

  for (var i = 0; i < 4; i++) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "options";
    listItemEl.id = "option" + i;
    orderedListEl.appendChild(listItemEl);
  }
  questionEL.appendChild(orderedListEl);
  //add correct/incorrect indicator
  rightOrWrong = document.createElement("h2");

  mainBodyEl.appendChild(questionEL);
  rightOrWrong.id = "rightwrong";
  mainBodyEl.appendChild(rightOrWrong);
  //generate first question
  generateQuestion();
  //initialize timer
  counter = 60;
  timer.textContent = counter;
  t = setInterval(function () {
    if (counter > 0 && !gameOver) {
      counter--;
      counter = Math.max(0, counter);
      timer.textContent = counter;
    } else if (gameOver) {
      //checks if gameOver has been reached through completing all questions
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
    //checks if there are any more questions
    if (questionCounter < questions.length - 1) {
      if (targetEl.textContent === questions[questionCounter].correct) {
        rightOrWrong.textContent = "Correct!";
      } else {
        rightOrWrong.textContent = "Incorrect!";
        counter -= 10;
        counter = Math.max(0, counter);
        timer.textContent = counter;
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
  //remove questionEl and create endScreenEl
  questionEL.remove();
  endScreenEl = document.createElement("div");
  endScreenEl.innerHTML =
    "<h1>All done!</h1><p>Your final score is " +
    counter +
    "</p><form><input type='text' name='initials' placeholder='Enter Your Initials' /><button class='btn' id='save-initials'>Submit</button>";
  mainBodyEl.appendChild(endScreenEl);
};
var submitScoreHandler = function (event) {
  //prevent form reload on submit
  event.preventDefault();
  var savedScores = localStorage.getItem("highscores");
  //only sets highscores to savedScores if they exist
  if (savedScores) {
    highscores = savedScores;
    highscores = JSON.parse(highscores);
  }
  var initials = document.querySelector("input[name='initials']").value;
  var highScoreObj = { name: initials, score: counter };
  //checks if text field is empty
  if (!highScoreObj.name) {
    window.alert("Please enter your initials!");
    return false;
  }
  //update highscores in local storage
  highscores.push(highScoreObj);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  endScreenEl.remove();
  window.location = "highscores.html";
};

initialScene();
//experimented with designating the start game listener at startScreenEL
//because initialScene() will always load startScreenEl before the event listener
//is called
startScreenEl.addEventListener("click", gameStartHandler);
mainBodyEl.addEventListener("click", nextQuestion);
mainBodyEl.addEventListener("submit", submitScoreHandler);
