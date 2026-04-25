// ── DOM REFERENCES ──
const character = document.getElementById("character");
const gameArea = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const distanceDisplay = document.getElementById("distance");
const timeDisplay = document.getElementById("time");
const gameOverScreen = document.getElementById("gameover");
const finalScore = document.getElementById("finalscore");

// ── STATE VARIABLES ──
let score = 0;
let distance = 0;
let time = 0;
let gameRunning = true;
let obstacleSpeed = 4;
let frameCount = 0;
let nextObstacleIn = 90; // frames until next obstacle spawns

// ── ACTIVE OBSTACLES LIST ──
let obstacles = [];

// ── TIMER ──
let timerInterval = setInterval(() => {
    if (!gameRunning) return;
    time++;
    timeDisplay.innerText = `Time: ${time}s`;
}, 1000);

// ── JUMP FUNCTION ──
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

// ── CREATE OBSTACLE ──
function spawnObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = gameArea.offsetWidth + "px";
  gameArea.appendChild(obs);
  obstacles.push(obs);
}

// ── GAME OVER ──
function triggerGameOver() {
  gameRunning = false;
  clearInterval(timerInterval);

  // Remove all obstacles
  obstacles.forEach(obs => obs.remove());
  obstacles = [];

  finalScore.innerText = `Your score: ${score}`;
  gameOverScreen.style.display = "flex";
}

// ── RESTART ──
function restartGame() {
  score = 0;
  distance = 0;
  time = 0;
  frameCount = 0;
  nextObstacleIn = 90;
  gameRunning = true;
  obstacles = [];

  scoreDisplay.innerText = "Score: 0";
  distanceDisplay.innerText = "Distance: 0m";
  timeDisplay.innerText = "Time: 0s";

  gameOverScreen.style.display = "none";

  timerInterval = setInterval(() => {
    if (!gameRunning) return;
    time++;
    timeDisplay.innerText = `Time: ${time}s`;
  }, 1000);

  requestAnimationFrame(gameLoop);
}

// ── COLLISION CHECK ──
function isColliding(obs) {
  const charRect = character.getBoundingClientRect();
  const obsRect = obs.getBoundingClientRect();

  // Shrink the hitbox slightly for fairer collision feel
  return (
    charRect.right - 10 > obsRect.left + 5 &&
    charRect.left + 10 < obsRect.right - 5 &&
    charRect.bottom - 5 > obsRect.top + 5
  );
}

// ── MAIN GAME LOOP ──
function gameLoop() {
  if (!gameRunning) return;
  frameCount++;

  if (frameCount >= nextObstacleIn) {
    spawnObstacle();
    frameCount = 0;
    nextObstacleIn = Math.floor(Math.random() * 60) + 60;
  }

  obstacles.forEach((obs, index) => {
    const currentLeft = parseInt(obs.style.left);
    obs.style.left = (currentLeft - obstacleSpeed) + "px";

    // Check collision
    if (isColliding(obs)) {
      triggerGameOver();
      return;
    }

    // Score a point only once per obstacle using a data attribute as a flag
    if (currentLeft < 50 && currentLeft > 40 && !obs.dataset.scored) {
      obs.dataset.scored = "true"; // mark this obstacle as already scored
      score++;
      distance++;
      scoreDisplay.innerText = `Score: ${score}`;
      distanceDisplay.innerText = `Distance: ${distance}m`;
    }

    // Remove obstacle once it goes off screen left
    if (currentLeft < -20) {
      obs.remove();
      obstacles.splice(index, 1);
    }
  });

  obstacleSpeed = 4 + Math.floor(score / 5);
  requestAnimationFrame(gameLoop);
}
// ── START GAME ──
requestAnimationFrame(gameLoop);