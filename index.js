const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");

// Jump function
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (!character.classList.contains("jump")) {
      character.classList.add("jump");

      setTimeout(() => {
        character.classList.remove("jump");
      }, 500);
    }
  }
});

// Collision detection
let checkCollision = setInterval(() => {
  let charBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  if (obstacleRight > 500 && obstacleRight < 550 && charBottom < 40) {
    alert("Game Over!");
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
  }
}, 10);

// Scoring System for the Jumping Game
score = 0;
scoreDisplay = document.getElementById("score");

if (obstacleRight > charBottom) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}

// Distance Travelled for the Jumping Game
distance = 0;
distanceDisplay = document.getElementById("distance");

if (obstacleRight > charBottom) {  
    distance++;
    distanceDisplay.innerText = `Distance: ${distance}m`;
}

// Timer for the Jumping Game
let time = 0;
timeDisplay = document.getElementById("time");

setInterval(() => {
    time++;
    timeDisplay.innerText = `Time: ${time}s`;
}, 1000);
