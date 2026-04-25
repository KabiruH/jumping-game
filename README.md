# 🦕 T-Rex Jumping Game

A browser-based endless runner game inspired by the Google Chrome T-Rex game, built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries.

## 🚀 How to Run

1. Download or clone the project files
2. Make sure all files are in the same folder:

3. Open `index.html` in your browser — no server or install needed.

## 🎮 How to Play

- Press **Space** to make the dinosaur jump
- Avoid the incoming green obstacles
- The game gets faster as your score increases
- Try to survive as long as possible and beat your high score!

## ⌨️ Controls

| Key | Action |
|-----|--------|
| `Space` | Jump |

## ✨ Features

- Endless obstacle generation with randomised gaps
- Collision detection using real-time element positions
- Score and distance tracking
- Timer showing how long you've survived
- Gradually increasing obstacle speed as score rises
- Game over overlay with final score
- Play Again button to restart without refreshing
- First obstacle spawns closer so the game eases in naturally

## 🧠 How It Works

### Obstacle Generation
Obstacles are created dynamically by JavaScript using `document.createElement()` and appended to the game area. Each obstacle is tracked in an `obstacles` array. A frame counter determines when to spawn the next one, with a randomised gap of 60–120 frames between spawns.

### Game Loop
The game runs on `requestAnimationFrame` which syncs with the browser's natural 60fps refresh rate. Every frame, each obstacle moves left by the current obstacle speed. This is smoother and more efficient than `setInterval`.

### Collision Detection
Collision is handled using `getBoundingClientRect()` which returns the real pixel position of any element on screen at that exact moment. The hitbox is slightly shrunk on all sides to make collisions feel fair rather than punishing.

### Scoring
Each obstacle carries a `data-scored` attribute. The first time an obstacle enters the scoring zone it sets `data-scored="true"` and increments the score once. This prevents the score from counting multiple times while the obstacle is in the zone across several frames.

### Increasing Difficulty
Every 5 points the obstacle speed increases by 1:
```javascript
obstacleSpeed = 4 + Math.floor(score / 5);
```
This keeps the game feeling progressively harder without becoming impossible too quickly.

## 🛠️ Built With

- HTML5 — semantic structure with header, main, footer and kbd elements
- CSS3 — flexbox layout, keyframe animations, absolute positioning
- Vanilla JavaScript — requestAnimationFrame game loop, dynamic DOM manipulation, getBoundingClientRect collision detection