//this might not have warrented a second script file, but it made things easier to follow
var highscores = localStorage.getItem("highscores");
var scoreListEl = document.querySelector("#scores-list");
mainBodyEl = document.querySelector("body");
// returns user to play screen if no highscores saved
if (!highscores) {
  window.alert("No scores to show! Play a game first!");
  window.location = "index.html";
}
//sorts scores from highest to lowest
highscores = JSON.parse(highscores);
highscores.sort((a, b) => {
  return b.score - a.score;
});
//creates highscore list
for (var i = 0; i < highscores.length; i++) {
  var listEl = document.createElement("li");
  listEl.className = "score-item";
  listEl.textContent = highscores[i].name + " - " + highscores[i].score;
  scoreListEl.appendChild(listEl);
}
//clears scores from local storage
var clearScoreHandler = function (event) {
  targetEl = event.target;
  if (targetEl.matches("#clear-scores")) {
    highscores = "";
    localStorage.setItem("highscores", highscores);
    location.reload();
  }
};
mainBodyEl.addEventListener("click", clearScoreHandler);
