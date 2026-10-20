"use strict";
const $ = id => document.getElementById(id);
const canvas = $("board");
const ctx = canvas.getContext("2d");
const CELL = 30;
const COUNT = 20;
const translations = {
    pl: {
        subtitle: "Klasyczna gra w nowym wydaniu",
        backMenu: "← Menu główne",
        themeLabel: "Motyw",
        graphicsLabel: "Grafika",
        difficultyLabel: "Trudność",
        languageLabel: "Język",
        darkTheme: "🌙 Ciemny",
        lightTheme: "☀️ Jasny",
        modernGraphics: "✨ Nowoczesna",
        retroGraphics: "▣ Retro",
        normalMode: "Normalny",
        hardMode: "Trudny ☠",
        worldLabel: "AKTUALNY ŚWIAT",
        nextMap: "Nowa mapa za",
        fixedMap: "STAŁA MAPA",
        welcome: "SNAKE WORLD",
        scoreLabel: "TWÓJ WYNIK",
        bestLabel: "🏆 Rekord",
        fruitsLabel: "🍎 Owoce",
        levelLabel: "⚡ Poziom szybkości",
        newGame: "↻ Nowa gra",
        controlsLabel: "STEROWANIE",
        tip: "WASD / strzałki — ruch, spacja — start / pauza",
        optionsTitle: "⚙️ Ustawienia gry",
        personalize: "DOPASUJ",
        mapsOption: "Zmiana map",
        mapsDesc: "Nowy świat co 20 / 8 sekund",
        obstaclesOption: "Przeszkody",
        obstaclesDesc: "Bloki do omijania",
        speedOption: "Przyspieszanie",
        speedDesc: "Wąż przyspiesza po owocach",
        gridOption: "Siatka planszy",
        gridDesc: "Linie dzielące pola",
        effectsOption: "Efekty graficzne",
        effectsDesc: "Poświata i animacje",
        optionsNote: "Zasady zmienisz przed grą. Siatkę i efekty także w trakcie.",
        rankingTitle: "🏆 TOP 10",
        rankingEmpty: "Brak wyników — zagraj i zapisz rekord!",
        rankingNote: "Ranking lokalny. Własne zasady mają osobną tabelę.",
        customNormal: "Własny · Normalny",
        customHard: "Własny · Trudny",
        nameLabel: "Nazwa gracza",
        saveScore: "💾 Zapisz wynik",
        scoreSaved: "Wynik zapisany!",
        playerPlaceholder: "Gracz",
        defaultPlayer: "Gracz",
        readyTitle: "Gotowy do gry?",
        readyDescription: "Zbieraj owoce, unikaj przeszkód i pobij rekord!",
        startButton: "▶ Rozpocznij",
        introMessage: "Sterowanie: WASD lub strzałki, spacja — start / pauza.",
        countdownMessage: "Przygotuj się! Start za 3 sekundy.",
        countdownGo: "START!",
        startMessage: "Powodzenia! Zbieraj owoce.",
        newWorldMessage: "Nowa mapa! Uważaj na przeszkody.",
        newMap: "NOWY ŚWIAT:",
        fasterMessage: "⚡ Wąż przyspieszył!",
        winTitle: "WYGRANA!",
        winReason: "Zapełniłeś całą planszę!",
        gameOverTitle: "KONIEC GRY",
        wallReason: "Uderzyłeś w ścianę.",
        obstacleReason: "Uderzyłeś w przeszkodę.",
        tailReason: "Uderzyłeś w swój ogon.",
        scoreSuffix: "Wynik:",
        points: "pkt.",
        againButton: "↻ Zagraj ponownie",
        pauseTitle: "PAUZA",
        pauseDescription: "Gra jest zatrzymana.",
        resumeButton: "▶ Wznów grę",
        resumeShort: "▶ Wznów",
        pauseShort: "Ⅱ Pauza",
        normalHint: "Normalny: 160 ms/ruch • mapa co 20 s",
        hardHint: "Trudny: 95 ms/ruch • mapa co 8 s • dużo przeszkód",
        customHint: "⚙️ Grasz na własnych zasadach — osobny ranking"
    },
    en: {
        subtitle: "Classic game, fresh look",
        backMenu: "← Main menu",
        themeLabel: "Theme",
        graphicsLabel: "Graphics",
        difficultyLabel: "Difficulty",
        languageLabel: "Language",
        darkTheme: "🌙 Dark",
        lightTheme: "☀️ Light",
        modernGraphics: "✨ Modern",
        retroGraphics: "▣ Retro",
        normalMode: "Normal",
        hardMode: "Hard ☠",
        worldLabel: "CURRENT WORLD",
        nextMap: "Next map in",
        fixedMap: "FIXED MAP",
        welcome: "SNAKE WORLD",
        scoreLabel: "YOUR SCORE",
        bestLabel: "🏆 Best",
        fruitsLabel: "🍎 Fruit",
        levelLabel: "⚡ Speed level",
        newGame: "↻ New game",
        controlsLabel: "CONTROLS",
        tip: "WASD / arrows — move, space — start / pause",
        optionsTitle: "⚙️ Game settings",
        personalize: "CUSTOMIZE",
        mapsOption: "Changing maps",
        mapsDesc: "New world every 20 / 8 seconds",
        obstaclesOption: "Obstacles",
        obstaclesDesc: "Blocks to avoid",
        speedOption: "Speed increases",
        speedDesc: "Snake speeds up after fruit",
        gridOption: "Board grid",
        gridDesc: "Lines dividing tiles",
        effectsOption: "Visual effects",
        effectsDesc: "Glow and animations",
        optionsNote: "Change gameplay rules before starting. Grid and effects anytime.",
        rankingTitle: "🏆 TOP 10",
        rankingEmpty: "No scores yet — play and set a record!",
        rankingNote: "Local leaderboard. Custom rules have separate rankings.",
        customNormal: "Custom · Normal",
        customHard: "Custom · Hard",
        nameLabel: "Player name",
        saveScore: "💾 Save score",
        scoreSaved: "Score saved!",
        playerPlaceholder: "Player",
        defaultPlayer: "Player",
        readyTitle: "Ready to play?",
        readyDescription: "Collect fruit, dodge obstacles, and beat your record!",
        startButton: "▶ Start game",
        introMessage: "Controls: WASD or arrows, space — start / pause.",
        countdownMessage: "Get ready! Starting in 3 seconds.",
        countdownGo: "GO!",
        startMessage: "Good luck! Collect fruit.",
        newWorldMessage: "New map! Watch out for obstacles.",
        newMap: "NEW WORLD:",
        fasterMessage: "⚡ Snake sped up!",
        winTitle: "YOU WIN!",
        winReason: "You filled the whole board!",
        gameOverTitle: "GAME OVER",
        wallReason: "You hit the wall.",
        obstacleReason: "You hit an obstacle.",
        tailReason: "You hit your tail.",
        scoreSuffix: "Score:",
        points: "pts",
        againButton: "↻ Play again",
        pauseTitle: "PAUSED",
        pauseDescription: "The game is paused.",
        resumeButton: "▶ Resume game",
        resumeShort: "▶ Resume",
        pauseShort: "Ⅱ Pause",
        normalHint: "Normal: 160 ms/move • map every 20 s",
        hardHint: "Hard: 95 ms/move • map every 8 s • many obstacles",
        customHint: "⚙️ Custom rules — separate leaderboard"
    }
};
const maps = [
    {
        pl: "NEON CITY",
        en: "NEON CITY",
        bg: "#0a1528",
        lightBg: "#eafcf6",
        grid: "#1d3347",
        lightGrid: "#d1ede7",
        snake: "#49e2b6",
        head: "#b9ffdf",
        food: "#ff668f",
        block: "#657faf",
        accent: "#53edc3",
        ink: "#12826b",
        amount: 0
    },
    {
        pl: "TOKSYCZNY LAS",
        en: "TOXIC FOREST",
        bg: "#14281f",
        lightBg: "#f2fbe8",
        grid: "#284535",
        lightGrid: "#d8e9c7",
        snake: "#92e66b",
        head: "#eaffb2",
        food: "#ffc26d",
        block: "#5b8b54",
        accent: "#b7f378",
        ink: "#42751d",
        amount: 12
    },
    {
        pl: "WULKAN",
        en: "VOLCANO",
        bg: "#321923",
        lightBg: "#fff0e7",
        grid: "#57323c",
        lightGrid: "#efd5c7",
        snake: "#ff9258",
        head: "#ffe2a1",
        food: "#ff597b",
        block: "#a95055",
        accent: "#ffb07a",
        ink: "#ae5124",
        amount: 16
    },
    {
        pl: "LODOWA KRAINA",
        en: "ICE KINGDOM",
        bg: "#112d40",
        lightBg: "#eff9ff",
        grid: "#2b516b",
        lightGrid: "#cce4f1",
        snake: "#69d4f1",
        head: "#e0fbff",
        food: "#ff97cb",
        block: "#5aa1c1",
        accent: "#7ddfff",
        ink: "#1d7194",
        amount: 13
    }
];
const read = (key, fallback) => {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
    } catch {
        return fallback;
    }
};
const store = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch {
    }
};
let language = read("snake-language", "pl") === "en" ? "en" : "pl";
let theme = read("snake-theme", "dark") === "light" ? "light" : "dark";
let graphics = read("snake-graphics", "modern") === "retro" ? "retro" : "modern";
let difficulty = read("snake-difficulty", "normal") === "hard" ? "hard" : "normal";
const optionIds = {
    maps: "opt-maps",
    obstacles: "opt-obstacles",
    acceleration: "opt-acceleration",
    grid: "opt-grid",
    effects: "opt-effects"
};
const options = Object.fromEntries(
    Object.keys(optionIds).map(key => [
        key,
        read("snake-opt-" + key, "true") === "true"
    ])
);
const t = key => translations[language][key] || key;
const initialSnake = () => [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
];
let snake = initialSnake();
let previousSnake = initialSnake();
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let turned = false;
let food = null;
let obstacles = [];
let score = 0;
let eaten = 0;
let mapIndex = 0;
let seconds = 20;
let playing = false;
let paused = false;
let moveTimer = null;
let mapTimer = null;
let particles = [];
let moveAt = performance.now();
let prevFrame = 0;
let best = 0;
let scoreSaved = false;
let resultCategory = "normal";
let messageKey = "introMessage";
let overlayState = {
    title: "readyTitle",
    description: "readyDescription",
    button: "startButton",
    showScore: false
};
let countdownActive = false;
let countdownNumber = 3;
let countdownTimer = null;
function category() {
    const custom =
        !options.maps ||
        !options.obstacles ||
        !options.acceleration;
    return custom
        ? (difficulty === "hard" ? "customHard" : "customNormal")
        : difficulty;
}
function readRanking() {
    try {
        const data = JSON.parse(
            read("snake-leaderboard-v1", "{}")
        );
        const clean = key =>
            Array.isArray(data?.[key])
                ? data[key].filter(item =>
                    item &&
                    typeof item.name === "string" &&
                    Number.isFinite(Number(item.score))
                ).slice(0, 10)
                : [];
        return {
            normal: clean("normal"),
            hard: clean("hard"),
            customNormal: clean("customNormal"),
            customHard: clean("customHard")
        };
    } catch {
        return {
            normal: [],
            hard: [],
            customNormal: [],
            customHard: []
        };
    }
}
function getBest(key) {
    return Math.max(
        0,
        ...readRanking()[key].map(item =>
            Number(item.score) || 0
        )
    );
}
function renderRanking() {
    const list = $("ranking-list");
    const rows = readRanking()[$("ranking-filter").value];
    list.replaceChildren();
    $("ranking-empty").textContent =
        rows.length ? "" : t("rankingEmpty");
    rows.forEach((entry, i) => {
        const li = document.createElement("li");
        const pos = document.createElement("span");
        const name = document.createElement("span");
        const pts = document.createElement("strong");
        pos.className = "ranking-position";
        name.className = "ranking-player";
        pts.className = "ranking-points";
        pos.textContent = (i + 1) + ".";
        name.textContent = entry.name.slice(0, 16);
        pts.textContent = String(Number(entry.score));
        li.append(pos, name, pts);
        list.append(li);
    });
}
function saveScore() {
    if (
        playing ||
        scoreSaved ||
        $("save-score-box").hidden ||
        $("overlay").hidden
    ) {
        return;
    }
    const name =
        $("player-name").value.trim().slice(0, 16) ||
        t("defaultPlayer");
    store("snake-player-name", name);
    const table = readRanking();
    table[resultCategory].push({
        name,
        score,
        time: Date.now()
    });
    table[resultCategory].sort(
        (a, b) => b.score - a.score || a.time - b.time
    );
    table[resultCategory] = table[resultCategory].slice(0, 10);
    store("snake-leaderboard-v1", JSON.stringify(table));
    scoreSaved = true;
    $("save-score-btn").disabled = true;
    $("save-score-feedback").textContent = t("scoreSaved");
    $("ranking-filter").value = resultCategory;
    best = Math.max(best, getBest(resultCategory));
    updateStats();
    renderRanking();
}
function mapSeconds() {
    return difficulty === "hard" ? 8 : 20;
}
function speed() {
    if (!options.acceleration) {
        return difficulty === "hard" ? 95 : 160;
    }
    return difficulty === "hard"
        ? Math.max(43, 95 - Math.floor(eaten / 2) * 6)
        : Math.max(85, 160 - Math.floor(eaten / 3) * 10);
}
function setMapColors() {
    const map = maps[mapIndex];
    $("map-name").textContent = map[language];
    document.documentElement.style.setProperty(
        "--accent",
        graphics === "retro" ? "#9cc88b" : map.accent
    );
    document.documentElement.style.setProperty(
        "--accent-ink",
        graphics === "retro"
            ? (theme === "light" ? "#45653d" : "#aee28f")
            : (theme === "light" ? map.ink : map.accent)
    );
}
function updateMapInfo() {
    $("next-map-label").textContent =
        t(options.maps ? "nextMap" : "fixedMap");
    $("map-time").textContent =
        options.maps ? seconds : "—";
    $("map-unit").textContent =
        options.maps ? "s" : "";
}
function updateStats() {
    $("score").textContent = score;
    $("best").textContent = best;
    $("eaten").textContent = eaten;
    $("speed").textContent = options.acceleration
        ? 1 + Math.floor(eaten / (difficulty === "hard" ? 2 : 3))
        : 1;
    updateMapInfo();
}
function updateHint() {
    $("difficulty-hint").textContent =
        t(difficulty === "hard" ? "hardHint" : "normalHint") +
        (category().startsWith("custom")
            ? "  ·  " + t("customHint")
            : "");
    $("option-note").textContent = t("optionsNote");
}
function renderOverlay() {
    $("overlay-title").textContent = t(overlayState.title);
    $("overlay-desc").textContent =
        t(overlayState.description) +
        (overlayState.showScore
            ? " " + t("scoreSuffix") + " " + score + " " + t("points")
            : "");
    $("overlay-btn").textContent = t(overlayState.button);
}
function showOverlay(title, description, button, showScore = false) {
    overlayState = {
        title,
        description,
        button,
        showScore
    };
    renderOverlay();
    $("overlay").hidden = false;
}
function setMessage(key) {
    messageKey = key;
    $("message").textContent = t(key);
}
function updateLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    $("player-name").placeholder = t("playerPlaceholder");
    $("board").setAttribute(
        "aria-label",
        language === "pl" ? "Plansza gry Snake" : "Snake game board"
    );
    const labels = {
        pl: {
            up: "Góra",
            left: "Lewo",
            right: "Prawo",
            down: "Dół"
        },
        en: {
            up: "Up",
            left: "Left",
            right: "Right",
            down: "Down"
        }
    };
    document.querySelectorAll("[data-dir]").forEach(button => {
        button.setAttribute(
            "aria-label",
            labels[language][button.dataset.dir]
        );
    });

    $("message").textContent = t(messageKey);

    $("map-banner").textContent =
        t("newMap") + " " + maps[mapIndex][language];

    $("pause-btn").textContent =
        t(paused ? "resumeShort" : "pauseShort");

    $("save-score-feedback").textContent =
        scoreSaved ? t("scoreSaved") : "";

    if (
        countdownActive &&
        $("start-countdown").classList.contains("go")
    ) {
        $("start-countdown").textContent = t("countdownGo");
    }

    setMapColors();
    updateMapInfo();
    updateHint();
    renderOverlay();
    renderRanking();
}

function applyAppearance() {
    document.body.classList.toggle(
        "light-theme",
        theme === "light"
    );

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

function animate(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
}

function lockRules(lock) {
    $("difficulty-select").disabled = lock;

    ["maps", "obstacles", "acceleration"].forEach(key => {
        $(optionIds[key]).disabled = lock;
    });
}

const same = (a, b) =>
    a.x === b.x && a.y === b.y;

function makeFood() {
    const free = [];

    for (let y = 0; y < COUNT; y++) {
        for (let x = 0; x < COUNT; x++) {
            const p = { x, y };

            if (
                !snake.some(s => same(s, p)) &&
                !obstacles.some(o => same(o, p))
            ) {
                free.push(p);
            }
        }
    }

    if (!free.length) {
        food = null;
        endGame("winTitle", "winReason");
        return;
    }

    food = free[Math.floor(Math.random() * free.length)];
}

function makeObstacles() {
    obstacles = [];

    if (!options.obstacles) return;

    const count = difficulty === "hard"
        ? maps[mapIndex].amount * 2 + 18
        : maps[mapIndex].amount;

    for (
        let i = 0, tries = 0;
        i < count && tries < 2000;
        tries++
    ) {
        const p = {
            x: Math.floor(Math.random() * COUNT),
            y: Math.floor(Math.random() * COUNT)
        };

        const head = snake[0];

        if (
            Math.abs(p.x - head.x) <= 2 &&
            Math.abs(p.y - head.y) <= 2
        ) {
            continue;
        }

        if (
            snake.some(s => same(s, p)) ||
            obstacles.some(o => same(o, p)) ||
            (food && same(food, p))
        ) {
            continue;
        }

        obstacles.push(p);
        i++;
    }
}

function changeMap() {
    if (!options.maps) return;

    mapIndex = (mapIndex + 1) % maps.length;

    makeObstacles();
    setMapColors();

    if (options.effects) {
        $("map-banner").textContent =
            t("newMap") + " " + maps[mapIndex][language];

        animate($("map-banner"), "show");
        animate($("board-box"), "map-flash");
    }

    setMessage("newWorldMessage");
}

function stopTimers() {
    clearInterval(moveTimer);
    clearInterval(mapTimer);
}

function startTimers() {
    stopTimers();

    moveTimer = setInterval(moveSnake, speed());

    if (options.maps) {
        mapTimer = setInterval(() => {
            seconds--;

            if (seconds <= 0) {
                changeMap();
                seconds = mapSeconds();
            }

            updateMapInfo();
        }, 1000);
    }
}

function startCountdown() {
    countdownActive = true;
    countdownNumber = 3;

    clearTimeout(countdownTimer);

    const number = $("start-countdown");

    number.hidden = false;
    number.classList.remove("go");

    function nextNumber() {
        if (!countdownActive) return;

        if (countdownNumber > 0) {
            number.textContent = String(countdownNumber);
            number.classList.remove("go", "pop");

            void number.offsetWidth;

            number.classList.add("pop");
            countdownNumber--;

            countdownTimer = setTimeout(nextNumber, 1000);
        } else {
            number.textContent = t("countdownGo");
            number.classList.remove("pop");
            number.classList.add("go");

            countdownTimer = setTimeout(() => {
                countdownActive = false;
                number.hidden = true;
                number.classList.remove("go", "pop");

                playing = true;
                moveAt = performance.now() - speed();

                $("pause-btn").disabled = false;

                setMessage("startMessage");
                startTimers();
            }, 450);
        }
    }

    nextNumber();
}

function startGame() {
    if (countdownActive) return;

    clearTimeout(countdownTimer);
    stopTimers();

    snake = initialSnake();
    previousSnake = initialSnake();

    moveAt = performance.now() - speed();

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    turned = false;

    food = null;
    score = 0;
    eaten = 0;
    mapIndex = 0;
    seconds = mapSeconds();

    obstacles = [];
    particles = [];

    resultCategory = category();
    best = getBest(resultCategory);
    scoreSaved = false;
    playing = false;
    paused = false;

    $("save-score-box").hidden = true;
    $("save-score-btn").disabled = false;
    $("save-score-feedback").textContent = "";

    lockRules(true);
    setMapColors();

    if (difficulty === "hard") {
        makeObstacles();
    }

    makeFood();
    updateStats();

    $("overlay").hidden = true;
    $("pause-btn").disabled = true;
    $("pause-btn").textContent = t("pauseShort");

    setMessage("countdownMessage");
    startCountdown();
}

function endGame(title, description) {
    playing = false;
    paused = false;

    stopTimers();
    lockRules(false);

    $("pause-btn").disabled = true;
    $("save-score-box").hidden = false;
    $("save-score-btn").disabled = false;

    scoreSaved = false;

    $("player-name").value = read("snake-player-name", "");
    $("save-score-feedback").textContent = "";

    setMessage(description);
    showOverlay(title, description, "againButton", true);
}

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

function moveSnake() {
    if (!playing || paused) return;

    direction = nextDirection;
    turned = false;

    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    const eating = food && same(head, food);

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= COUNT ||
        head.y >= COUNT
    ) {
        endGame("gameOverTitle", "wallReason");
        return;
    }

    if (obstacles.some(o => same(o, head))) {
        endGame("gameOverTitle", "obstacleReason");
        return;
    }

    if (
        (eating ? snake : snake.slice(0, -1))
            .some(s => same(s, head))
    ) {
        endGame("gameOverTitle", "tailReason");
        return;
    }

    previousSnake = snake.map(s => ({ ...s }));
    moveAt = performance.now();

    snake.unshift(head);

    if (eating) {
        score += 10;
        eaten++;

        if (options.effects) {
            makeParticles(head.x, head.y);

            const fl = $("score-float");

            fl.style.left = ((head.x + .5) / COUNT * 100) + "%";
            fl.style.top = ((head.y + .5) / COUNT * 100) + "%";

            animate(fl, "show");
            animate($("score"), "pop");
        }

        if (score > best) {
            best = score;
        }

        makeFood();

        if (!playing) return;

        if (
            options.acceleration &&
            eaten % (difficulty === "hard" ? 2 : 3) === 0
        ) {
            clearInterval(moveTimer);
            moveTimer = setInterval(moveSnake, speed());

            setMessage("fasterMessage");
        }
    } else {
        snake.pop();
    }

    updateStats();
}

function togglePause() {
    if (!playing) return;

    paused = !paused;

    if (paused) {
        stopTimers();

        $("pause-btn").textContent = t("resumeShort");

        showOverlay(
            "pauseTitle",
            "pauseDescription",
            "resumeButton"
        );
    } else {
        $("overlay").hidden = true;
        $("pause-btn").textContent = t("pauseShort");

        moveAt = performance.now() - speed();

        startTimers();
    }
}

function makeParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;

        particles.push({
            x: (x + .5) * CELL,
            y: (y + .5) * CELL,
            vx: Math.cos(a) * 3,
            vy: Math.sin(a) * 3,
            life: 24
        });
    }
}

function drawGrid(map) {
    if (!options.grid) return;

    ctx.strokeStyle = graphics === "retro"
        ? "#314d3540"
        : (theme === "light" ? map.lightGrid : map.grid);

    ctx.lineWidth = 1;

    for (let i = 0; i <= COUNT; i++) {
        ctx.beginPath();

        ctx.moveTo(i * CELL + .5, 0);
        ctx.lineTo(i * CELL + .5, 600);

        ctx.moveTo(0, i * CELL + .5);
        ctx.lineTo(600, i * CELL + .5);

        ctx.stroke();
    }
}

function drawRetro() {
    const bg = theme === "light" ? "#c9dca1" : "#93ae77";
    const ink = "#28452e";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 600, 600);

    drawGrid(maps[mapIndex]);

    obstacles.forEach(o => {
        ctx.fillStyle = "#6e8b61";
        ctx.fillRect(o.x * CELL + 2, o.y * CELL + 2, 26, 26);

        ctx.fillStyle = ink;
        ctx.fillRect(o.x * CELL + 10, o.y * CELL + 10, 10, 10);
    });

    if (food) {
        ctx.fillStyle = ink;

        ctx.fillRect(
            food.x * CELL + 9,
            food.y * CELL + 9,
            13,
            13
        );

        ctx.fillRect(
            food.x * CELL + 13,
            food.y * CELL + 4,
            5,
            6
        );
    }

    snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? ink : "#466247";

        ctx.fillRect(
            s.x * CELL + 2,
            s.y * CELL + 2,
            26,
            26
        );

        ctx.strokeStyle = bg;

        ctx.strokeRect(
            s.x * CELL + 4,
            s.y * CELL + 4,
            22,
            22
        );
    });
}

function drawModern(time, dt) {
    const map = maps[mapIndex];

    ctx.fillStyle = theme === "light" ? map.lightBg : map.bg;
    ctx.fillRect(0, 0, 600, 600);

    drawGrid(map);

    obstacles.forEach(o => {
        ctx.fillStyle = map.block;
        ctx.beginPath();
        ctx.roundRect(
            o.x * CELL + 4,
            o.y * CELL + 4,
            22,
            22,
            6
        );
        ctx.fill();
    });

    if (food) {
        const x = (food.x + .5) * CELL;
        const y = (food.y + .5) * CELL;

        ctx.fillStyle = map.food;

        if (options.effects) {
            ctx.shadowColor = map.food;
            ctx.shadowBlur = 16;
        }

        ctx.beginPath();
        ctx.arc(
            x,
            y,
            options.effects
                ? 10 + Math.sin(time / 180) * 1.8
                : 10,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffffaa";
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 2.8, 0, Math.PI * 2);
        ctx.fill();
    }

    const p = playing && !paused
        ? Math.min(1, Math.max(0, (time - moveAt) / speed()))
        : 1;

    for (let i = snake.length - 1; i >= 0; i--) {
        const target = snake[i];

        const from =
            previousSnake[i] ||
            previousSnake.at(-1) ||
            target;

        const x =
            (from.x + (target.x - from.x) * p) * CELL;

        const y =
            (from.y + (target.y - from.y) * p) * CELL;

        ctx.fillStyle =
            i === 0 ? map.head : map.snake;

        if (i === 0 && options.effects) {
            ctx.shadowColor = map.snake;
            ctx.shadowBlur = 11;
        }

        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, 26, 26, 9);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (i === 0) {
            ctx.fillStyle = "#143d3b";

            for (const side of [-1, 1]) {
                const ex =
                    x + 15 + direction.x * 6 -
                    direction.y * side * 6;

                const ey =
                    y + 15 + direction.y * 6 +
                    direction.x * side * 6;

                ctx.beginPath();
                ctx.arc(ex, ey, 2.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    if (options.effects) {
        particles.forEach(p => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;

            ctx.globalAlpha = Math.max(0, p.life / 24);
            ctx.fillStyle = map.food;

            ctx.fillRect(p.x, p.y, 4, 4);
        });

        ctx.globalAlpha = 1;

        particles = particles.filter(p => p.life > 0);
    } else {
        particles = [];
    }
}

function draw(time) {
    const dt = Math.min(
        2,
        (time - prevFrame) / 16.67 || 1
    );

    prevFrame = time;

    if (graphics === "retro") {
        drawRetro();
        particles = [];
    } else {
        drawModern(time, dt);
    }

    requestAnimationFrame(draw);
}

$("theme-select").value = theme;
$("graphics-select").value = graphics;
$("difficulty-select").value = difficulty;
$("language-select").value = language;

$("ranking-filter").value = category();
$("player-name").value = read("snake-player-name", "");

Object.entries(optionIds).forEach(([name, id]) => {
    const el = $(id);

    el.checked = options[name];

    el.addEventListener("change", () => {
        options[name] = el.checked;

        store(
            "snake-opt-" + name,
            String(el.checked)
        );

        if (!playing) {
            best = getBest(category());
            $("ranking-filter").value = category();
            seconds = mapSeconds();

            updateStats();
            renderRanking();
        }

        if (!options.effects) {
            particles = [];

            $("map-banner").classList.remove("show");
            $("score-float").classList.remove("show");
        }

        updateHint();
    });
});

$("theme-select").addEventListener("change", e => {
    theme = e.target.value;

    store("snake-theme", theme);
    applyAppearance();
});

$("graphics-select").addEventListener("change", e => {
    graphics = e.target.value;

    store("snake-graphics", graphics);
    applyAppearance();
});

$("language-select").addEventListener("change", e => {
    language = e.target.value;

    store("snake-language", language);

    updateLanguage();
});

$("difficulty-select").addEventListener("change", e => {
    if (playing) return;

    difficulty = e.target.value;

    store("snake-difficulty", difficulty);

    seconds = mapSeconds();
    best = getBest(category());

    $("ranking-filter").value = category();

    updateStats();
    updateHint();
    renderRanking();
});

$("ranking-filter").addEventListener(
    "change",
    renderRanking
);

$("save-score-btn").addEventListener(
    "click",
    saveScore
);

$("player-name").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        saveScore();
    }
});

$("start-btn").addEventListener(
    "click",
    startGame
);

$("pause-btn").addEventListener(
    "click",
    togglePause
);

$("overlay-btn").addEventListener("click", () => {
    if (playing && paused) {
        togglePause();
    } else {
        startGame();
    }
});

const directions = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0]
};

document.addEventListener("keydown", e => {
    if (
        ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)
    ) {
        return;
    }

    const key =
        e.key.length === 1
            ? e.key.toLowerCase()
            : e.key;

    if (directions[key]) {
        e.preventDefault();
        changeDirection(...directions[key]);
    } else if (key === " ") {
        e.preventDefault();

        if (countdownActive || e.repeat) return;

        if (playing) {
            togglePause();
        } else {
            startGame();
        }
    }
});

document.querySelectorAll("[data-dir]").forEach(el => {
    el.addEventListener("click", () => {
        const names = {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0]
        };

        changeDirection(...names[el.dataset.dir]);
    });
});

seconds = mapSeconds();
best = getBest(category());

applyAppearance();
updateLanguage();
updateStats();

requestAnimationFrame(draw);

const snakeFullscreenButton =
    document.getElementById("fullscreen-btn");

const snakeFullscreenSection =
    document.getElementById("game-section");

function updateSnakeFullscreenButton() {
    const active =
        document.fullscreenElement === snakeFullscreenSection;

    snakeFullscreenButton.textContent =
        language === "en"
            ? (active ? "Exit fullscreen" : " Fullscreen")
            : (active ? "Wyłącz pełny ekran" : " Pełny ekran");

    snakeFullscreenButton.setAttribute(
        "aria-pressed",
        String(active)
    );
}

snakeFullscreenButton.addEventListener("click", async () => {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await snakeFullscreenSection.requestFullscreen();
        }
    } catch (error) {
        console.error(
            "Nie udało się włączyć pełnego ekranu / Fullscreen failed:",
            error
        );
    }
    snakeFullscreenButton.blur();
    updateSnakeFullscreenButton();
});

document.addEventListener(
    "fullscreenchange",
    updateSnakeFullscreenButton
);

document.getElementById("language-select").addEventListener(
    "change",
    updateSnakeFullscreenButton
);

updateSnakeFullscreenButton();