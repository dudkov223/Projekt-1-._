
const ArcadeAudio = (() => {
    let audio = null;
    let musicTimer = null;
    let musicStep = 0;
    let game = "snake";
    let playing = false;

    let soundOn = localStorage.getItem("arcade-sound") !== "false";
    let musicOn = localStorage.getItem("arcade-music") !== "false";

    const melodies = {
        snake: [
            392, 0, 523, 659, 0, 523, 440, 0,
            349, 440, 523, 0, 392, 0, 330, 0
        ],
        tetris: [
            330, 392, 440, 392, 330, 294, 262, 0,
            294, 330, 392, 330, 294, 262, 247, 0,
            262, 330, 392, 523, 494, 392, 330, 0,
            349, 440, 523, 440, 392, 330, 294, 0
        ]
    };

    function unlock() {
        try {
            if (!audio) {
                audio = new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();
            }
            if (audio.state === "suspended") {
                audio.resume();
            }
        } catch (error) {
            console.log("Dźwięk niedostępny:", error);
        }
    }

    function beep(freq, duration = 0.1, type = "square",
                  volume = 0.035, delay = 0) {
        if (!audio || !freq) return;

        const start = audio.currentTime + delay;
        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(
            volume, start + 0.01
        );
        gain.gain.exponentialRampToValueAtTime(
            0.0001, start + duration
        );

        osc.connect(gain);
        gain.connect(audio.destination);

        osc.start(start);
        osc.stop(start + duration + 0.02);
    }

    function effect(name) {
        if (!soundOn) return;

        unlock();

        if (name === "start") {
            beep(520, 0.09);
            beep(780, 0.16, "square", 0.04, 0.1);
        }

        if (name === "count") {
            beep(420, 0.07);
        }

        if (name === "eat") {
            beep(730, 0.09);
            beep(990, 0.12, "square", 0.04, 0.08);
        }

        if (name === "map") {
            beep(380, 0.12);
            beep(510, 0.12, "square", 0.035, 0.1);
            beep(680, 0.15, "square", 0.035, 0.2);
        }

        if (name === "boost") {
            beep(920, 0.07);
            beep(1140, 0.1, "triangle", 0.025, 0.07);
        }

        if (name === "move") {
            beep(240, 0.025, "triangle", 0.01);
        }

        if (name === "rotate") {
            beep(520, 0.065, "triangle", 0.025);
        }

        if (name === "drop") {
            beep(180, 0.1, "sawtooth", 0.04);
        }

        if (name === "lock") {
            beep(150, 0.06, "triangle", 0.017);
        }

        if (name === "line") {
            beep(500, 0.09);
            beep(650, 0.09, "square", 0.04, 0.09);
            beep(880, 0.2, "square", 0.04, 0.18);
        }

        if (name === "pause") {
            beep(300, 0.1, "triangle", 0.025);
        }

        if (name === "over") {
            beep(480, 0.16);
            beep(350, 0.16, "square", 0.035, 0.16);
            beep(230, 0.3, "triangle", 0.04, 0.32);
        }

        if (name === "win") {
            beep(520, 0.15);
            beep(660, 0.15, "square", 0.04, 0.14);
            beep(880, 0.25, "square", 0.04, 0.28);
        }
    }

    function stopMusic() {
        clearInterval(musicTimer);
        musicTimer = null;
    }

    function playNote() {
        if (!playing || !musicOn || document.hidden) return;

        const melody = melodies[game];
        const note = melody[musicStep % melody.length];

        musicStep++;

        if (note) {
            beep(
                note,
                0.13,
                game === "snake" ? "triangle" : "square",
                0.012
            );
        }
    }

    function startMusic() {
        stopMusic();

        if (!playing || !musicOn || document.hidden) return;

        unlock();
        playNote();

        musicTimer = setInterval(
            playNote,
            game === "snake" ? 225 : 185
        );
    }

    function setPlaying(value) {
        playing = value;
        startMusic();
    }

    function updateButtons() {
        const soundButton = document.getElementById("sound-btn");
        const musicButton = document.getElementById("music-btn");

        const english = document.documentElement.lang === "en";

        if (soundButton) {
            soundButton.textContent = soundOn
                ? (english ? "🔊 Sound ON" : "🔊 Dźwięk WŁ.")
                : (english ? "🔇 Sound OFF" : "🔇 Dźwięk WYŁ.");
        }

        if (musicButton) {
            musicButton.textContent = musicOn
                ? (english ? "🎵 Music ON" : "🎵 Muzyka WŁ.")
                : (english ? "🎵 Music OFF" : "🎵 Muzyka WYŁ.");
        }
    }

    function init(selectedGame) {
        game = selectedGame;
        updateButtons();

        document.getElementById("sound-btn")
            ?.addEventListener("click", () => {
                soundOn = !soundOn;
                localStorage.setItem("arcade-sound", soundOn);

                unlock();
                updateButtons();

                if (soundOn) effect("start");
            });

        document.getElementById("music-btn")
            ?.addEventListener("click", () => {
                musicOn = !musicOn;
                localStorage.setItem("arcade-music", musicOn);

                startMusic();
                updateButtons();
            });
    }

    document.addEventListener("visibilitychange", startMusic);
    window.addEventListener("pagehide", stopMusic);

    return {
        init,
        unlock,
        effect,
        setPlaying,
        updateButtons
    };
})();
