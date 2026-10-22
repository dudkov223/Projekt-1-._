
const arcadeAudio = (() => {
    let context = null;
    let musicTimer = null;
    let playing = false;
    let game = "snake";
    let language = "pl";
    let noteIndex = 0;

    let soundOn = true;
    let musicOn = true;

    try {
        soundOn = localStorage.getItem("arcade-sound") !== "false";
        musicOn = localStorage.getItem("arcade-music") !== "false";
    } catch (error) {
        console.log(error);
    }

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
        ],

        pong: [
            220, 0, 330, 0, 440, 330, 0, 262,
            0, 392, 330, 0, 294, 0, 247, 0
        ]
    };

    function unlock() {
        try {
            if (!context) {
                const AudioType =
                    window.AudioContext ||
                    window.webkitAudioContext;

                if (!AudioType) return false;

                context = new AudioType();
            }

            if (context.state === "suspended") {
                context.resume();
            }

            return true;
        } catch (error) {
            return false;
        }
    }

    function beep(
        frequency,
        duration = 0.1,
        type = "square",
        volume = 0.035,
        delay = 0
    ) {
        if (!context || !frequency) return;

        const start = context.currentTime + delay;

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.0001, start);

        gain.gain.exponentialRampToValueAtTime(
            volume,
            start + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            start + duration
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start(start);
        oscillator.stop(start + duration + 0.02);
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

        if (name === "paddle") {
            beep(420, 0.055, "square", 0.018);
        }

        if (name === "point") {
            beep(640, 0.11, "triangle", 0.04);
            beep(840, 0.17, "square", 0.025, 0.1);
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
        if (!playing || !musicOn || document.hidden) {
            return;
        }

        const melody = melodies[game];
        const frequency = melody[noteIndex % melody.length];

        noteIndex++;

        if (frequency) {
            beep(
                frequency,
                0.13,
                game === "snake" ? "triangle" : "square",
                0.012
            );
        }
    }

    function startMusic() {
        stopMusic();

        if (!playing || !musicOn || document.hidden) {
            return;
        }

        unlock();
        playNote();

        let interval = 225;

        if (game === "tetris") interval = 185;
        if (game === "pong") interval = 260;

        musicTimer = setInterval(playNote, interval);
    }

    function setPlaying(value) {
        playing = Boolean(value);
        startMusic();
    }

    function refresh(newLanguage = language) {
        language = newLanguage;

        const soundBtn = document.getElementById("sound-btn");
        const musicBtn = document.getElementById("music-btn");

        if (soundBtn) {
            soundBtn.textContent = soundOn
                ? (language === "en"
                    ? "🔊 Sound ON"
                    : "🔊 Dźwięk WŁ.")
                : (language === "en"
                    ? "🔇 Sound OFF"
                    : "🔇 Dźwięk WYŁ.");

            soundBtn.setAttribute("aria-pressed", String(soundOn));
        }

        if (musicBtn) {
            musicBtn.textContent = musicOn
                ? (language === "en"
                    ? "🎵 Music ON"
                    : "🎵 Muzyka WŁ.")
                : (language === "en"
                    ? "🎵 Music OFF"
                    : "🎵 Muzyka WYŁ.");

            musicBtn.setAttribute("aria-pressed", String(musicOn));
        }
    }

    function init(gameName, selectedLanguage = "pl") {
        game = gameName;
        language = selectedLanguage;

        const soundBtn = document.getElementById("sound-btn");
        const musicBtn = document.getElementById("music-btn");

        soundBtn?.addEventListener("click", () => {
            soundOn = !soundOn;

            try {
                localStorage.setItem("arcade-sound", soundOn);
            } catch (error) {}

            unlock();
            refresh();

            if (soundOn) effect("start");
        });

        musicBtn?.addEventListener("click", () => {
            musicOn = !musicOn;

            try {
                localStorage.setItem("arcade-music", musicOn);
            } catch (error) {}

            unlock();
            startMusic();
            refresh();
        });

        refresh();
    }

    document.addEventListener("visibilitychange", startMusic);
    window.addEventListener("pagehide", stopMusic);

    return {
        init,
        unlock,
        effect,
        setPlaying,
        refresh
    };
})();
