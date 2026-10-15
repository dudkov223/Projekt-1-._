
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");
const bestText = document.getElementById("best");
const eatenText = document.getElementById("eaten");
const speedText = document.getElementById("speed");
const message = document.getElementById("message");
const overlay = document.getElementById("overlay");
const pauseButton = document.getElementById("pause-btn");
const mapBanner = document.getElementById("map-banner");

const CELL = 30;
const COUNT = 20;
const MAP_SECONDS = 20;

const translations = {
    pl: {
        subtitle: "Jedna gra, cztery zmieniające się mapy",
        themeLabel: "Motyw",
        languageLabel: "Język",
        graphicsLabel: "Grafika",
        difficultyLabel: "Trudność",
        normalMode: "Normalny",
        hardMode: "Trudny ☠",
        retroGraphics: "▣ Retro",
        modernGraphics: "✨ Nowoczesny",
        darkTheme: "🌙 Ciemny",
        lightTheme: "☀️ Jasny",
        nextMap: "Zmiana mapy za",
        scoreLabel: "WYNIK",
        bestLabel: "🏆 Rekord",
        fruitsLabel: "🍎 Owoce",
        levelLabel: "⚡ Poziom szybkości",
        newGame: "↻ Nowa gra",
        controlsLabel: "STEROWANIE",
        tip: "W, A, S, D lub strzałki. Unikaj przeszkód!",

        rankingTitle: "🏆 RANKING TOP 10",
        rankingEmpty: "Brak wyników. Zagraj i zapisz swój wynik!",
        rankingNote: "Ranking lokalny: zapisany tylko w tej przeglądarce.",
        nameLabel: "Twoja nazwa do rankingu",
        saveScore: "💾 Zapisz wynik",
        scoreSaved: "Wynik zapisany!",
        playerPlaceholder: "Gracz",
        defaultPlayer: "Gracz",

        normalHint: "Normalny: start 160 ms, mapy co 20 s, mniej przeszkód.",
        hardHint: "TRUDNY: start 95 ms, mapy co 8 s, znacznie więcej przeszkód już od startu!",
        hardStartMessage: "TRYB TRUDNY! Szybki wąż, przeszkody i zmiana mapy za 8 sekund!",

        readyTitle: "Gotowy do gry?",
        readyDescription: "Zbieraj jedzenie i unikaj przeszkód. Co 20 sekund mapa się zmienia!",
        startButton: "▶ Rozpocznij",
        introMessage: "Sterowanie: strzałki lub WASD. Spacja = pauza.",
        startMessage: "Zbieraj owoce! Za 20 sekund zmieni się mapa.",
        newWorldMessage: "Nowy świat! Uważaj na przeszkody.",
        newMap: "🌍 NOWA MAPA:",
        fasterMessage: "⚡ Wąż przyspieszył!",

        winTitle: "WYGRANA!",
        winReason: "Wypełniłeś dostępną planszę!",
        gameOverTitle: "KONIEC GRY",
        wallReason: "Uderzyłeś w krawędź planszy.",
        obstacleReason: "Uderzyłeś w przeszkodę.",
        tailReason: "Uderzyłeś we własny ogon.",

        scoreSuffix: "Wynik:",
        points: "pkt.",
        againButton: "↻ Zagraj ponownie",
        pauseTitle: "PAUZA",
        pauseDescription: "Gra jest zatrzymana.",
        resumeButton: "▶ Wznów grę",
        resumeShort: "▶ Wznów",
        pauseShort: "Ⅱ Pauza"
    },

    en: {
        subtitle: "One game, four changing worlds",
        themeLabel: "Theme",
        languageLabel: "Language",
        graphicsLabel: "Graphics",
        difficultyLabel: "Difficulty",
        normalMode: "Normal",
        hardMode: "Hard ☠",
        retroGraphics: "▣ Retro",
        modernGraphics: "✨ Modern",
        darkTheme: "🌙 Dark",
        lightTheme: "☀️ Light",
        nextMap: "Next map in",
        scoreLabel: "SCORE",
        bestLabel: "🏆 Best",
        fruitsLabel: "🍎 Fruit",
        levelLabel: "⚡ Speed level",
        newGame: "↻ New game",
        controlsLabel: "CONTROLS",
        tip: "W, A, S, D or arrow keys. Avoid the obstacles!",

        rankingTitle: "🏆 TOP 10 LEADERBOARD",
        rankingEmpty: "No scores yet. Play and save your score!",
        rankingNote: "Local ranking: stored only in this browser.",
        nameLabel: "Your leaderboard name",
        saveScore: "💾 Save score",
        scoreSaved: "Score saved!",
        playerPlaceholder: "Player",
        defaultPlayer: "Player",

        normalHint: "Normal: 160 ms at start, maps every 20 s, fewer obstacles.",
        hardHint: "HARD: 95 ms at start, maps every 8 s, many more obstacles right away!",
        hardStartMessage: "HARD MODE! Fast snake, obstacles, and a map change in 8 seconds!",

        readyTitle: "Ready to play?",
        readyDescription: "Collect food and avoid obstacles. The map changes every 20 seconds!",
        startButton: "▶ Start game",
        introMessage: "Controls: arrows or WASD. Space = pause.",
        startMessage: "Collect fruit! The map changes in 20 seconds.",
        newWorldMessage: "New world! Watch out for obstacles.",
        newMap: "🌍 NEW MAP:",
        fasterMessage: "⚡ The snake sped up!",

        winTitle: "YOU WIN!",
        winReason: "You filled all the available spaces!",
        gameOverTitle: "GAME OVER",
        wallReason: "You hit the edge of the board.",
        obstacleReason: "You hit an obstacle.",
        tailReason: "You ran into your own tail.",

        scoreSuffix: "Score:",
        points: "pts",
        againButton: "↻ Play again",
        pauseTitle: "PAUSED",
        pauseDescription: "The game is paused.",
        resumeButton: "▶ Resume game",
        resumeShort: "▶ Resume",
        pauseShort: "Ⅱ Pause"
    }
};

// 4. ZAPAMIĘTYWANIE USTAWIEŃ
let language = localStorage.getItem("snake-language") === "en"
    ? "en" : "pl";

let theme = localStorage.getItem("snake-theme") === "light"
    ? "light" : "dark";

let graphics = localStorage.getItem("snake-graphics") === "retro"
    ? "retro" : "modern";

let difficulty = localStorage.getItem("snake-difficulty") === "hard"
    ? "hard" : "normal";

let scoreSaved = false;
let resultDifficulty = difficulty;

const difficultySelect = document.getElementById("difficulty-select");
const rankingFilter = document.getElementById("ranking-filter");
const saveScoreBox = document.getElementById("save-score-box");
const playerNameInput = document.getElementById("player-name");
const saveScoreButton = document.getElementById("save-score-btn");
const scoreFeedback = document.getElementById("save-score-feedback");

// Na trudnym mapa zmienia się co 8 sekund.
function mapSeconds() {
    return difficulty === "hard" ? 8 : MAP_SECONDS;
}


// ========================================
// 5. RANKING TOP 10
// ========================================

// Odczytywanie wyników z przeglądarki.
function readRanking() {
    try {
        const data = JSON.parse(
            localStorage.getItem("snake-leaderboard-v1") || "{}"
        );

        if (!data || typeof data !== "object") {
            return { normal: [], hard: [] };
        }

        const clean = rows =>
            Array.isArray(rows)
                ? rows.filter(item =>
                    item &&
                    typeof item.name === "string" &&
                    Number.isFinite(Number(item.score))
                ).slice(0, 10)
                : [];

        return {
            normal: clean(data.normal),
            hard: clean(data.hard)
        };

    } catch {
        return { normal: [], hard: [] };
    }
}

// Najlepszy wynik na danym poziomie.
function getBest(mode) {
    const entries = readRanking()[mode];

    return Math.max(
        0,
        ...entries.map(entry => Number(entry.score) || 0)
    );
}

// Wyświetlanie rankingu.
function renderRanking() {
    const mode = rankingFilter.value;

    const data = readRanking()[mode].slice(0, 10);

    const list = document.getElementById("ranking-list");
    const empty = document.getElementById("ranking-empty");

    list.replaceChildren();

    empty.textContent = data.length
        ? ""
        : t("rankingEmpty");

    data.forEach((entry, index) => {
        const row = document.createElement("li");
        const pos = document.createElement("span");
        const name = document.createElement("span");
        const points = document.createElement("strong");

        pos.className = "ranking-position";
        name.className = "ranking-player";
        points.className = "ranking-points";

        pos.textContent = String(index + 1) + ".";
        name.textContent = String(entry.name || "-").slice(0, 16);
        points.textContent = String(Number(entry.score) || 0);

        row.append(pos, name, points);
        list.appendChild(row);
    });
}

// Zapisywanie wyniku po zakończeniu gry.
function saveScore() {
    if (
        playing ||
        scoreSaved ||
        overlay.hidden ||
        saveScoreBox.hidden
    ) {
        return;
    }

    const name = playerNameInput.value.trim().slice(0, 16)
        || t("defaultPlayer");

    localStorage.setItem("snake-player-name", name);

    const ranking = readRanking();

    ranking[resultDifficulty].push({
        name,
        score,
        time: Date.now()
    });

    // Sortowanie od najlepszego wyniku.
    ranking[resultDifficulty].sort(
        (a, b) => b.score - a.score || a.time - b.time
    );

    // Zostawiamy tylko 10 najlepszych.
    ranking[resultDifficulty] =
        ranking[resultDifficulty].slice(0, 10);

    localStorage.setItem(
        "snake-leaderboard-v1",
        JSON.stringify(ranking)
    );

    scoreSaved = true;
    saveScoreButton.disabled = true;

    scoreFeedback.textContent = t("scoreSaved");

    best = getBest(difficulty);

    updateStats();

    rankingFilter.value = resultDifficulty;

    renderRanking();
}

function updateDifficultyHint() {
    document.getElementById("difficulty-hint").textContent =
        t(difficulty === "hard" ? "hardHint" : "normalHint");
}


// ========================================
// 6. ZMIANA JĘZYKA
// ========================================

function t(key) {
    return translations[language][key];
}

let messageKey = "introMessage";

let overlayState = {
    title: "readyTitle",
    description: "readyDescription",
    button: "startButton",
    showScore: false
};

function setMessage(key) {
    messageKey = key;
    message.textContent = t(key);
}

function updateLanguage() {
    document.documentElement.lang = language;

    document.title = language === "pl"
        ? "Snake World — Zmienne Mapy"
        : "Snake World — Changing Maps";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });

    message.textContent = t(messageKey);

    document.getElementById("map-name").textContent =
        maps[mapIndex][language];

    document.getElementById("map-banner").textContent =
        t("newMap") + " " + maps[mapIndex][language];

    document.getElementById("board").setAttribute(
        "aria-label",
        language === "pl"
            ? "Plansza gry Snake"
            : "Snake game board"
    );

    const directionsPL = {
        up: "Góra",
        down: "Dół",
        left: "Lewo",
        right: "Prawo"
    };

    const directionsEN = {
        up: "Up",
        down: "Down",
        left: "Left",
        right: "Right"
    };

    document.querySelectorAll("[data-dir]").forEach(button => {
        button.setAttribute(
            "aria-label",
            (language === "pl" ? directionsPL : directionsEN)[button.dataset.dir]
        );
    });

    renderOverlay();
    renderRanking();
    updateDifficultyHint();

    playerNameInput.placeholder = t("playerPlaceholder");

    scoreFeedback.textContent = scoreSaved
        ? t("scoreSaved")
        : "";

    pauseButton.textContent =
        t(paused ? "resumeShort" : "pauseShort");
}

function renderOverlay() {
    document.getElementById("overlay-title").textContent =
        t(overlayState.title);

    let description = t(overlayState.description);

    if (overlayState.showScore) {
        description +=
            " " + t("scoreSuffix") +
            " " + score +
            " " + t("points");
    }

    document.getElementById("overlay-desc").textContent =
        description;

    document.getElementById("overlay-btn").textContent =
        t(overlayState.button);
}


// ========================================
// 7. MOTYW I GRAFIKA
// ========================================

function applyTheme() {
    document.body.classList.toggle(
        "light-theme",
        theme === "light"
    );

    setMapColors();
}

function applyGraphics() {
    document.body.classList.toggle(
        "retro-graphics",
        graphics === "retro"
    );

    document.body.classList.toggle(
        "modern-graphics",
        graphics === "modern"
    );

    setMapColors();
}


// ========================================
// 8. WYBÓR USTAWIEŃ
// ========================================

document.getElementById("language-select").value = language;
document.getElementById("theme-select").value = theme;
document.getElementById("graphics-select").value = graphics;

difficultySelect.value = difficulty;
rankingFilter.value = difficulty;

playerNameInput.value =
    localStorage.getItem("snake-player-name") || "";

rankingFilter.addEventListener("change", renderRanking);

saveScoreButton.addEventListener("click", saveScore);

playerNameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        saveScore();
    }
});

// Zmiana trudności.
difficultySelect.addEventListener("change", event => {
    if (playing) return;

    difficulty = event.target.value;

    localStorage.setItem("snake-difficulty", difficulty);

    seconds = mapSeconds();

    rankingFilter.value = difficulty;

    best = getBest(difficulty);

    updateStats();
    renderRanking();
    updateDifficultyHint();
});

// Zmiana języka.
document.getElementById("language-select")
    .addEventListener("change", event => {
        language = event.target.value;

        localStorage.setItem("snake-language", language);

        updateLanguage();
    });

// Zmiana motywu.
document.getElementById("theme-select")
    .addEventListener("change", event => {
        theme = event.target.value;

        localStorage.setItem("snake-theme", theme);

        applyTheme();
    });

// Zmiana grafiki.
document.getElementById("graphics-select")
    .addEventListener("change", event => {
        graphics = event.target.value;

        localStorage.setItem("snake-graphics", graphics);

        applyGraphics();
    });


// ========================================
// 9. CZTERY MAPY
// ========================================

const maps = [
    {
        pl: "NEON CITY",
        en: "NEON CITY",
        lightBg: "#f1fcfb",
        lightGrid: "#c0e5da",
        lightText: "#087b5e",
        bg: "#091729",
        grid: "#20364c",
        snake: "#3be1a8",
        head: "#a2ffdd",
        food: "#ff697d",
        block: "#507dac",
        accent: "#4ff3c0",
        amount: 0
    },
    {
        pl: "TOKSYCZNY LAS",
        en: "TOXIC FOREST",
        lightBg: "#f2fae7",
        lightGrid: "#d4e7c2",
        lightText: "#43751e",
        bg: "#10251b",
        grid: "#2b4a37",
        snake: "#86de57",
        head: "#dcff9f",
        food: "#ffc361",
        block: "#61904b",
        accent: "#a9f26a",
        amount: 12
    },
    {
        pl: "WULKAN",
        en: "VOLCANO",
        lightBg: "#fff1e7",
        lightGrid: "#efd2c1",
        lightText: "#a14d1d",
        bg: "#301821",
        grid: "#52323c",
        snake: "#ff954e",
        head: "#ffe198",
        food: "#ff5875",
        block: "#a64a50",
        accent: "#ffad61",
        amount: 16
    },
    {
        pl: "LODOWA KRAINA",
        en: "ICE KINGDOM",
        lightBg: "#edf8ff",
        lightGrid: "#c4dff1",
        lightText: "#206e96",
        bg: "#0b253a",
        grid: "#2b4a67",
        snake: "#62c9ed",
        head: "#d5f7ff",
        food: "#ff97c9",
        block: "#4f98bd",
        accent: "#74dbff",
        amount: 13
    }
];


// ========================================
// 10. ZMIENNE GRY
// ========================================

let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];

let previousSnake = snake.map(part => ({ ...part }));

let lastMoveTime = performance.now();

let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };

let turned = false;

let food = null;
let obstacles = [];

let score = 0;
let eaten = 0;

let mapIndex = 0;
let seconds = mapSeconds();

let playing = false;
let paused = false;

let moveTimer = null;
let mapTimer = null;

let particles = [];

let best = getBest(difficulty);


// ========================================
// 11. FUNKCJE POMOCNICZE
// ========================================

function samePosition(a, b) {
    return a.x === b.x && a.y === b.y;
}

// Prędkość zależy od trudności.
function speed() {
    if (difficulty === "hard") {
        // Trudny: 95 ms na start, maksymalnie 43 ms.
        return Math.max(
            43,
            95 - Math.floor(eaten / 2) * 6
        );
    }

    // Normalny: 160 ms na start, maksymalnie 85 ms.
    return Math.max(
        85,
        160 - Math.floor(eaten / 3) * 10
    );
}

function setMapColors() {
    const map = maps[mapIndex];

    document.getElementById("map-name").textContent =
        map[language];

    const ink = graphics === "retro"
        ? (theme === "light" ? "#395d32" : "#b3d18a")
        : (theme === "light" ? map.lightText : map.accent);

    document.documentElement.style.setProperty(
        "--accent-ink",
        ink
    );

    document.documentElement.style.setProperty(
        "--accent",
        graphics === "retro" ? "#a8c07c" : map.accent
    );
}

function updateStats() {
    scoreText.textContent = score;
    bestText.textContent = best;
    eatenText.textContent = eaten;

    speedText.textContent =
        1 + Math.floor(eaten / 3);

    document.getElementById("map-time").textContent =
        seconds;
}

function animate(element, className) {
    element.classList.remove(className);

    void element.offsetWidth;

    element.classList.add(className);
}


// ========================================
// 12. LOSOWANIE JEDZENIA
// ========================================

function makeFood() {
    const free = [];

    for (let y = 0; y < COUNT; y++) {
        for (let x = 0; x < COUNT; x++) {
            const pos = { x, y };

            if (
                !snake.some(s => samePosition(s, pos)) &&
                !obstacles.some(o => samePosition(o, pos))
            ) {
                free.push(pos);
            }
        }
    }

    if (free.length === 0) {
        food = null;
        endGame("winTitle", "winReason");
        return;
    }

    food = free[
        Math.floor(Math.random() * free.length)
    ];
}


// ========================================
// 13. PRZESZKODY
// ========================================

function makeObstacles() {
    obstacles = [];

    const head = snake[0];

    const total = difficulty === "hard"
        ? maps[mapIndex].amount * 2 + 18
        : maps[mapIndex].amount;

    let tries = 0;

    while (
        obstacles.length < total &&
        tries < 1000
    ) {
        tries++;

        const pos = {
            x: Math.floor(Math.random() * COUNT),
            y: Math.floor(Math.random() * COUNT)
        };

        const nearHead =
            Math.abs(pos.x - head.x) <= 2 &&
            Math.abs(pos.y - head.y) <= 2;

        if (
            !nearHead &&
            !snake.some(s => samePosition(s, pos)) &&
            !obstacles.some(o => samePosition(o, pos)) &&
            !(food && samePosition(food, pos))
        ) {
            obstacles.push(pos);
        }
    }
}


// ========================================
// 14. ZMIANA MAPY
// ========================================

function changeMap() {
    mapIndex = (mapIndex + 1) % maps.length;

    setMapColors();
    makeObstacles();

    mapBanner.textContent =
        t("newMap") + " " + maps[mapIndex][language];

    animate(mapBanner, "show");

    animate(
        document.getElementById("board-box"),
        "map-flash"
    );

    setMessage("newWorldMessage");
}


// ========================================
// 15. LICZNIKI CZASU
// ========================================

function stopTimers() {
    clearInterval(moveTimer);
    clearInterval(mapTimer);
}

function startTimers() {
    stopTimers();

    moveTimer = setInterval(moveSnake, speed());

    mapTimer = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            changeMap();
            seconds = mapSeconds();
        }

        updateStats();
    }, 1000);
}


// ========================================
// 16. MENU, START I KONIEC GRY
// ========================================

function showOverlay(
    titleKey,
    descriptionKey,
    buttonKey,
    showScore = false
) {
    overlayState = {
        title: titleKey,
        description: descriptionKey,
        button: buttonKey,
        showScore
    };

    renderOverlay();
    overlay.hidden = false;
}

function startGame() {
    stopTimers();

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    previousSnake = snake.map(part => ({ ...part }));

    lastMoveTime = performance.now() - speed();

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    turned = false;

    score = 0;
    eaten = 0;

    resultDifficulty = difficulty;
    best = getBest(difficulty);

    scoreSaved = false;

    saveScoreBox.hidden = true;
    saveScoreButton.disabled = false;
    scoreFeedback.textContent = "";

    difficultySelect.disabled = true;

    seconds = mapSeconds();
    mapIndex = 0;

    obstacles = [];
    particles = [];

    playing = true;
    paused = false;

    setMapColors();

    if (difficulty === "hard") {
        makeObstacles();
    }

    makeFood();
    updateStats();

    overlay.hidden = true;

    pauseButton.disabled = false;
    pauseButton.textContent = t("pauseShort");

    setMessage(
        difficulty === "hard"
            ? "hardStartMessage"
            : "startMessage"
    );

    startTimers();
}

function endGame(titleKey, reasonKey) {
    playing = false;
    paused = false;

    stopTimers();

    pauseButton.disabled = true;
    difficultySelect.disabled = false;

    scoreSaved = false;
    saveScoreButton.disabled = false;
    saveScoreBox.hidden = false;

    playerNameInput.value =
        localStorage.getItem("snake-player-name") || "";

    scoreFeedback.textContent = "";

    setMessage(reasonKey);

    showOverlay(
        titleKey,
        reasonKey,
        "againButton",
        true
    );
}


// ========================================
// 17. STEROWANIE WĘŻEM
// ========================================

function changeDirection(x, y) {
    if (!playing || paused || turned) return;

    if (
        x === -direction.x &&
        y === -direction.y
    ) {
        return;
    }

    nextDirection = { x, y };
    turned = true;
}


// ========================================
// 18. RUCH WĘŻA I KOLIZJE
// ========================================

function moveSnake() {
    if (!playing || paused) return;

    direction = nextDirection;
    turned = false;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    const eating =
        food && samePosition(head, food);

    // Kolizja z krawędzią planszy.
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= COUNT ||
        head.y >= COUNT
    ) {
        endGame("gameOverTitle", "wallReason");
        return;
    }

    // Kolizja z przeszkodą.
    if (
        obstacles.some(o => samePosition(o, head))
    ) {
        endGame("gameOverTitle", "obstacleReason");
        return;
    }

    // Kolizja z ogonem.
    const body = eating
        ? snake
        : snake.slice(0, -1);

    if (
        body.some(s => samePosition(s, head))
    ) {
        endGame("gameOverTitle", "tailReason");
        return;
    }

    // Poprzednia pozycja do płynnej animacji.
    previousSnake = snake.map(part => ({ ...part }));
    lastMoveTime = performance.now();

    // Dodanie nowej głowy.
    snake.unshift(head);

    if (eating) {
        score += 10;
        eaten++;

        makeParticles(head.x, head.y);

        const floating =
            document.getElementById("score-float");

        floating.style.left =
            ((head.x + 0.5) / COUNT * 100) + "%";

        floating.style.top =
            ((head.y + 0.5) / COUNT * 100) + "%";

        animate(floating, "show");
        animate(scoreText, "pop");

        if (score > best) {
            best = score;
        }

        makeFood();

        if (!playing) return;

        // Przyspieszanie zależne od poziomu.
        if (
            eaten % (difficulty === "hard" ? 2 : 3) === 0
        ) {
            clearInterval(moveTimer);

            moveTimer = setInterval(
                moveSnake,
                speed()
            );

            setMessage("fasterMessage");
        }

    } else {
        snake.pop();
    }

    updateStats();
}


// ========================================
// 19. PAUZA
// ========================================

function togglePause() {
    if (!playing) return;

    paused = !paused;

    if (paused) {
        stopTimers();

        pauseButton.textContent =
            t("resumeShort");

        showOverlay(
            "pauseTitle",
            "pauseDescription",
            "resumeButton"
        );

    } else {
        overlay.hidden = true;

        pauseButton.textContent =
            t("pauseShort");

        startTimers();
    }
}


// ========================================
// 20. EFEKTY CZĄSTECZKOWE
// ========================================

function makeParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;

        particles.push({
            x: (x + 0.5) * CELL,
            y: (y + 0.5) * CELL,
            vx: Math.cos(angle) * 3,
            vy: Math.sin(angle) * 3,
            life: 25
        });
    }
}


// ========================================
// 21. GRAFIKA RETRO
// ========================================

function drawRetro(map) {
    const bg = theme === "light"
        ? "#c4d79a"
        : "#94af72";

    const dark = "#263d28";
    const middle = "#39563a";

    ctx.fillStyle = bg;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Siatka retro.
    ctx.strokeStyle = "rgba(38, 61, 40, 0.12)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= COUNT; i++) {
        ctx.beginPath();

        ctx.moveTo(i * CELL + .5, 0);
        ctx.lineTo(i * CELL + .5, canvas.height);

        ctx.moveTo(0, i * CELL + .5);
        ctx.lineTo(canvas.width, i * CELL + .5);

        ctx.stroke();
    }

    // Przeszkody retro.
    obstacles.forEach(part => {
        ctx.fillStyle = "#69875a";

        ctx.fillRect(
            part.x * CELL + 2,
            part.y * CELL + 2,
            CELL - 4,
            CELL - 4
        );

        ctx.fillStyle = dark;

        ctx.fillRect(
            part.x * CELL + 9,
            part.y * CELL + 9,
            CELL - 18,
            CELL - 18
        );
    });

    // Jedzenie retro.
    if (food) {
        const x = food.x * CELL;
        const y = food.y * CELL;

        ctx.fillStyle = dark;

        ctx.fillRect(
            x + 8,
            y + 8,
            CELL - 16,
            CELL - 16
        );

        ctx.fillRect(x + 12, y + 4, 6, 5);
    }

    // Kwadratowy wąż.
    snake.forEach((part, index) => {
        ctx.fillStyle =
            index === 0 ? dark : middle;

        ctx.fillRect(
            part.x * CELL + 1,
            part.y * CELL + 1,
            CELL - 2,
            CELL - 2
        );

        ctx.strokeStyle = bg;

        ctx.strokeRect(
            part.x * CELL + 3,
            part.y * CELL + 3,
            CELL - 6,
            CELL - 6
        );
    });
}


// ========================================
// 22. GRAFIKA NOWOCZESNA
// ========================================

function drawModern(map, time, dt) {
    // Tło.
    ctx.fillStyle =
        theme === "light"
            ? map.lightBg
            : map.bg;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Siatka.
    ctx.strokeStyle =
        theme === "light"
            ? map.lightGrid
            : map.grid;

    ctx.lineWidth = 1;

    for (let i = 0; i <= COUNT; i++) {
        ctx.beginPath();

        ctx.moveTo(i * CELL, 0);
        ctx.lineTo(i * CELL, canvas.height);

        ctx.moveTo(0, i * CELL);
        ctx.lineTo(canvas.width, i * CELL);

        ctx.stroke();
    }

    // Zaokrąglone przeszkody.
    obstacles.forEach(o => {
        ctx.fillStyle = map.block;

        ctx.beginPath();

        ctx.roundRect(
            o.x * CELL + 3,
            o.y * CELL + 3,
            CELL - 6,
            CELL - 6,
            6
        );

        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,.14)";

        ctx.fillRect(
            o.x * CELL + 8,
            o.y * CELL + 7,
            CELL - 16,
            3
        );
    });

    // Pulsujący owoc.
    if (food) {
        const x = (food.x + .5) * CELL;
        const y = (food.y + .5) * CELL;

        const radius =
            9.5 + Math.sin(time / 170) * 1.8;

        ctx.shadowColor = map.food;
        ctx.shadowBlur = 14;
        ctx.fillStyle = map.food;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
        ctx.shadowBlur = 0;

        // Błysk na owocu.
        ctx.fillStyle = "rgba(255,255,255,.72)";

        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 2.7, 0, Math.PI * 2);
        ctx.fill();
    }

    // Płynny ruch pomiędzy polami.
    const progress = playing && !paused
        ? Math.min(
            1,
            Math.max(
                0,
                (time - lastMoveTime) / speed()
            )
        )
        : 1;

    // Rysowanie od ogona do głowy.
    for (let i = snake.length - 1; i >= 0; i--) {
        const target = snake[i];

        const from =
            previousSnake[i] ||
            previousSnake[previousSnake.length - 1] ||
            target;

        const x = (
            from.x +
            (target.x - from.x) * progress
        ) * CELL;

        const y = (
            from.y +
            (target.y - from.y) * progress
        ) * CELL;

        const padding = i === 0 ? 1.5 : 2;

        ctx.fillStyle =
            i === 0 ? map.head : map.snake;

        if (i === 0) {
            ctx.shadowColor = map.snake;
            ctx.shadowBlur = 13;
        }

        ctx.beginPath();

        ctx.roundRect(
            x + padding,
            y + padding,
            CELL - padding * 2,
            CELL - padding * 2,
            9
        );

        ctx.fill();
        ctx.shadowBlur = 0;

        // Oczy głowy.
        if (i === 0) {
            const cx = x + CELL / 2;
            const cy = y + CELL / 2;

            ctx.fillStyle = "#142e2a";

            for (const side of [-1, 1]) {
                const ex =
                    cx +
                    direction.x * 6 -
                    direction.y * side * 6;

                const ey =
                    cy +
                    direction.y * 6 +
                    direction.x * side * 6;

                ctx.beginPath();

                ctx.arc(
                    ex,
                    ey,
                    2.5,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }
    }

    // Iskierki.
    particles.forEach(p => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;

        ctx.globalAlpha =
            Math.max(0, p.life / 25);

        ctx.fillStyle = map.food;

        ctx.fillRect(
            p.x,
            p.y,
            4,
            4
        );
    });

    ctx.globalAlpha = 1;

    particles = particles.filter(
        p => p.life > 0
    );
}


// ========================================
// 23. GŁÓWNE RYSOWANIE
// ========================================

let previousFrameTime = 0;

function draw(time) {
    const dt = Math.min(
        2,
        (time - previousFrameTime) / 16.67 || 1
    );

    previousFrameTime = time;

    if (graphics === "retro") {
        drawRetro(maps[mapIndex]);
        particles = [];
    } else {
        drawModern(
            maps[mapIndex],
            time,
            dt
        );
    }

    requestAnimationFrame(draw);
}


// ========================================
// 24. STEROWANIE KLAWIATURĄ
// ========================================

const directions = {
    ArrowUp: [0, -1],
    w: [0, -1],

    ArrowDown: [0, 1],
    s: [0, 1],

    ArrowLeft: [-1, 0],
    a: [-1, 0],

    ArrowRight: [1, 0],
    d: [1, 0]
};

document.addEventListener("keydown", event => {
    if (
        ["SELECT", "INPUT", "TEXTAREA"]
            .includes(event.target.tagName)
    ) {
        return;
    }

    const key = event.key.length === 1
        ? event.key.toLowerCase()
        : event.key;

    if (directions[key]) {
        event.preventDefault();

        changeDirection(...directions[key]);

    } else if (key === " ") {
        event.preventDefault();

        togglePause();
    }
});


// ========================================
// 25. PRZYCISKI STEROWANIA
// ========================================

document.querySelectorAll("[data-dir]").forEach(button => {
    button.addEventListener("click", () => {
        const key = button.dataset.dir;

        const names = {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0]
        };

        changeDirection(...names[key]);
    });
});


// ========================================
// 26. PRZYCISKI GRY
// ========================================

document.getElementById("start-btn")
    .addEventListener("click", startGame);

pauseButton.addEventListener(
    "click",
    togglePause
);

document.getElementById("overlay-btn")
    .addEventListener("click", () => {
        if (playing && paused) {
            togglePause();
        } else {
            startGame();
        }
    });


// ========================================
// 27. URUCHOMIENIE GRY
// ========================================

applyTheme();
applyGraphics();
updateLanguage();
updateStats();

requestAnimationFrame(draw);
