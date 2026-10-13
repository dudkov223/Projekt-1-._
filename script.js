 const canvas = document.getElementById("board");
 const ctx = canvas.getContext("2d");
 const scoreText = document.getElementById("score");
 const bestText = document.getElementById("best");
 const eatenText = document.getElementById("eaten");
 const speedText = document.getElementById("speed");
 const message = document.getElementById("message");
 const overlay = document.getElementById("overlay");
 const overlayBtn = document.getElementById("overlay-btn");
 const pauseBtn = document.getElementById("pause-btn");
 const boardBox = document.getElementById("board-box");
 const mapBanner = document.getElementById("map-banner");
 const CELL = 30;   
 const COUNT = canvas.width / CELL;  
 const MAP_SECONDS = 20;     
 const maps = [
     { name: "4", bg: "#091729", grid: "#1a3451", head: "#b1ffe1", body: "#39d8aa", food: "#ff667d", wall: "#467da6", accent: "#4ff3c0", blocks: 0 },
     { name: "3", bg: "#10251b", grid: "#264636", head: "#dcff94", body: "#78d94e", food: "#ffba55", wall: "#527c49", accent: "#a9f26a", blocks: 12 },
     { name: "2", bg: "#2b141b", grid: "#553039", head: "#ffe08f", body: "#ff8b47", food: "#ff4b76", wall: "#a3464b", accent: "#ffad61", blocks: 16 },
     { name: "1", bg: "#0a2237", grid: "#2a5274", head: "#d8f7ff", body: "#65c9ed", food: "#ff87b4", wall: "#5699c1", accent: "#74dbff", blocks: 13 }
 ];
 let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
 let direction = { x: 1, y: 0 };
 let nextDirection = { x: 1, y: 0 };
 let turned = false;
 let food = null;
 let obstacles = [];
 let score = 0;
 let eaten = 0;
 let best = Number(localStorage.getItem("snake-map-best") || 0);
 let mapIndex = 0;
 let mapCountdown = MAP_SECONDS;
 let running = false;
 let paused = false;
 let moveTimer = null;
 let mapTimer = null;
 let particles = [];
 function applyMap() {
     const map = maps[mapIndex];
     document.getElementById("map-name").textContent = map.name;
     document.documentElement.style.setProperty("--accent", map.accent);
 }
 function createFood() {
     const empty = [];
     for (let y = 0; y < COUNT; y++) {
         for (let x = 0; x < COUNT; x++) {
             const onSnake = snake.some(part => part.x === x && part.y === y);
             const onWall = obstacles.some(wall => wall.x === x && wall.y === y);
             if (!onSnake && !onWall) empty.push({ x, y });
         }
     }
     if (empty.length === 0) {
         food = null;
         endGame("BRAWO", "Wypełniłeś całą dostępną planszę!");
         return;
     }
     food = empty[Math.floor(Math.random() * empty.length)];
 }
 function createObstacles() {
     obstacles = [];
     const head = snake[0];
     const amount = maps[mapIndex].blocks;
     let attempts = 0;
     while (obstacles.length < amount && attempts < 1000) {
         attempts++;
         const x = Math.floor(Math.random() * COUNT);
         const y = Math.floor(Math.random() * COUNT);
         const tooClose = Math.abs(x - head.x) <= 2 && Math.abs(y - head.y) <= 2;
         const onSnake = snake.some(part => part.x === x && part.y === y);
         const onFood = food && food.x === x && food.y === y;
         const exists = obstacles.some(wall => wall.x === x && wall.y === y);
         if (!tooClose && !onSnake && !onFood && !exists) {
             obstacles.push({ x, y });
         }
     }
 }
 function changeMap() {
     mapIndex = (mapIndex + 1) % maps.length;
     applyMap();
     createObstacles();
     mapBanner.textContent = " NOWA MAPA: " + maps[mapIndex].name;
     replayAnimation(mapBanner, "show");
     replayAnimation(boardBox, "map-flash");
     message.textContent = "Mapa zmieniona! Uważaj na nowe przeszkody.";
 }
 function replayAnimation(element, className) {
     element.classList.remove(className);
     void element.offsetWidth;
     element.classList.add(className);
 }
 function updateStats() {
     scoreText.textContent = score;
     bestText.textContent = best;
     eatenText.textContent = eaten;
     speedText.textContent = 1 + Math.floor(eaten / 3);
     document.getElementById("map-time").textContent = mapCountdown;
 }
 function getSpeed() {
     return Math.max(85, 160 - Math.floor(eaten / 3) * 10);
 }
 function startTimers() {
     clearInterval(moveTimer);
     clearInterval(mapTimer);
     moveTimer = setInterval(moveSnake, getSpeed());
     mapTimer = setInterval(() => {
         mapCountdown--;
         if (mapCountdown <= 0) {
             changeMap();
             mapCountdown = MAP_SECONDS;
         }
         updateStats();
     }, 1000);
 }
 function stopTimers() {
     clearInterval(moveTimer);
     clearInterval(mapTimer);
 }
 function showOverlay(title, description, buttonText) {
     document.getElementById("overlay-title").textContent = title;
     document.getElementById("overlay-desc").textContent = description;
     overlayBtn.textContent = buttonText;
     overlay.hidden = false;
 }
 function startGame() {
     stopTimers();
     snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
     direction = { x: 1, y: 0 };
     nextDirection = { x: 1, y: 0 };
     turned = false;
     score = 0;
     eaten = 0;
     mapIndex = 0;
     mapCountdown = MAP_SECONDS;
     obstacles = [];
     particles = [];
     running = true;
     paused = false;
     applyMap();
     createFood();
     updateStats();
     overlay.hidden = true;
     pauseBtn.disabled = false;
     pauseBtn.textContent = "Ⅱ Pauza";
     message.textContent = "Powodzenia! Pierwsza zmiana mapy za 20 sekund.";
     startTimers();
 }
 function changeDirection(x, y) {
     if (!running || paused || turned) return;
     if (x === -direction.x && y === -direction.y) return;
     nextDirection = { x, y };
     turned = true;
 }
 function endGame(title, description) {
     running = false;
     paused = false;
     stopTimers();
     pauseBtn.disabled = true;
     message.textContent = description;
     showOverlay(title, description + " Twój wynik: " + score + " pkt.", "↻ Zagraj ponownie");
 }
 function moveSnake() {
     if (!running || paused) return;
     direction = nextDirection;
     turned = false;
     const head = {
         x: snake[0].x + direction.x,
         y: snake[0].y + direction.y
     };
     const eating = food && head.x === food.x && head.y === food.y;
     if (head.x < 0 || head.x >= COUNT || head.y < 0 || head.y >= COUNT) {
         endGame("KONIEC GRY", "Uderzyłeś w krawędź planszy.");
         return;
     }
     if (obstacles.some(wall => wall.x === head.x && wall.y === head.y)) {
         endGame("KONIEC GRY", "Uderzyłeś w przeszkodę.");
         return;
     }
     const body = eating ? snake : snake.slice(0, -1);
     if (body.some(part => part.x === head.x && part.y === head.y)) {
         endGame("KONIEC GRY", "Uderzyłeś we własny ogon.");
         return;
     }
     snake.unshift(head);
     if (eating) {
         score += 10;
         eaten++;
         makeParticles(head.x, head.y);
         const float = document.getElementById("score-float");
         float.style.left = ((head.x + 0.5) / COUNT * 100) + "%";
         float.style.top = ((head.y + 0.5) / COUNT * 100) + "%";
         replayAnimation(float, "show");
         replayAnimation(scoreText, "pop");
         if (score > best) {
             best = score;
             localStorage.setItem("snake-map-best", best);
         }
         createFood();
         if (eaten % 3 === 0) {
             clearInterval(moveTimer);
             moveTimer = setInterval(moveSnake, getSpeed());
             message.textContent = "⚡ Wąż przyspieszył!";
         }
     } else {
         snake.pop();
     }
     updateStats();
 }
 function togglePause() {
     if (!running) return;

     paused = !paused;
     if (paused) {
         stopTimers();
         pauseBtn.textContent = "Wznów";
         showOverlay("PAUZA", "Gra zatrzymana. Możesz odpocząć.", "▶ Wznów grę");
     } else {
         overlay.hidden = true;
         pauseBtn.textContent = "Ⅱ Pauza";
         message.textContent = "Grasz! Uważaj na przeszkody.";
         startTimers();
     }
 }
 function makeParticles(x, y) {
     for (let i = 0; i < 15; i++) {
         const angle = Math.random() * Math.PI * 2;
         particles.push({
             x: (x + 0.5) * CELL,
             y: (y + 0.5) * CELL,
             vx: Math.cos(angle) * (1 + Math.random() * 3),
             vy: Math.sin(angle) * (1 + Math.random() * 3),
             life: 28
         });
     }
 }
 function draw(time) {
     const map = maps[mapIndex];

     ctx.fillStyle = map.bg;
     ctx.fillRect(0, 0, canvas.width, canvas.height);
     ctx.strokeStyle = map.grid;
     ctx.lineWidth = 1;
     for (let i = 0; i <= COUNT; i++) {
         ctx.beginPath();
         ctx.moveTo(i * CELL, 0);
         ctx.lineTo(i * CELL, canvas.height);
         ctx.moveTo(0, i * CELL);
         ctx.lineTo(canvas.width, i * CELL);
         ctx.stroke();
     }
     obstacles.forEach(wall => {
         const x = wall.x * CELL;
         const y = wall.y * CELL;
         ctx.fillStyle = map.wall;
         ctx.fillRect(x + 3, y + 3, CELL - 6, CELL - 6);
         ctx.strokeStyle = map.accent;
         ctx.strokeRect(x + 5, y + 5, CELL - 10, CELL - 10);
     });
     if (food) {
         const x = (food.x + 0.5) * CELL;
         const y = (food.y + 0.5) * CELL;
         const radius = 10 + Math.sin(time / 160) * 2;
         ctx.shadowColor = map.food;
         ctx.shadowBlur = 20;
         ctx.fillStyle = map.food;
         ctx.beginPath();
         ctx.arc(x, y, radius, 0, Math.PI * 2);
         ctx.fill();
         ctx.shadowBlur = 0;
     }
     snake.forEach((part, index) => {
         ctx.fillStyle = index === 0 ? map.head : map.body;
         if (index === 0) {
             ctx.shadowColor = map.head;
             ctx.shadowBlur = 16;
         }
         ctx.fillRect(part.x * CELL + 2, part.y * CELL + 2, CELL - 4, CELL - 4);
         ctx.shadowBlur = 0;
     });
     if (snake.length > 0) {
         const x = (snake[0].x + 0.5) * CELL;
         const y = (snake[0].y + 0.5) * CELL;
         ctx.fillStyle = "#07362e";
         for (const side of [-1, 1]) {
             const ex = x + direction.x * 6 - direction.y * side * 6;
             const ey = y + direction.y * 6 + direction.x * side * 6;
             ctx.beginPath();
             ctx.arc(ex, ey, 2.3, 0, Math.PI * 2);
             ctx.fill();
         }
     }
     particles.forEach(p => {
         p.x += p.vx;
         p.y += p.vy;
         p.life--;
         ctx.globalAlpha = Math.max(0, p.life / 28);
         ctx.fillStyle = map.food;
         ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
     });
     ctx.globalAlpha = 1;
     particles = particles.filter(p => p.life > 0);

     requestAnimationFrame(draw);
 }
 const keys = {
     ArrowUp: [0, -1], w: [0, -1],
     ArrowDown: [0, 1], s: [0, 1],
     ArrowLeft: [-1, 0], a: [-1, 0],
     ArrowRight: [1, 0], d: [1, 0]
 };
 document.addEventListener("keydown", event => {
     const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
     if (keys[key]) {
         event.preventDefault();
         changeDirection(keys[key][0], keys[key][1]);
     } else if (key === " ") {
         event.preventDefault();
         togglePause();
     }
 });
 document.querySelectorAll("[data-dir]").forEach(button => {
     button.addEventListener("click", () => {
         const names = {
             up: [0, -1], down: [0, 1],
             left: [-1, 0], right: [1, 0]
         };
         const value = names[button.dataset.dir];
         changeDirection(value[0], value[1]);
     });
 });
 document.getElementById("start-btn").addEventListener("click", startGame);
 pauseBtn.addEventListener("click", togglePause);
 overlayBtn.addEventListener("click", () => {
     if (running && paused) togglePause();
     else startGame();
 });
 applyMap();
 updateStats();
 requestAnimationFrame(draw);