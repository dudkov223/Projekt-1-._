
const filters = document.querySelectorAll(".filter-btn");
const games = document.querySelectorAll(".game-card");
const visibleCount = document.getElementById("visible-count");

function gameWord(number) {
    if (number === 1) return "gra";
    if (number >= 2 && number <= 4) return "gry";

    return "gier";
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        const selected = button.dataset.filter;
        let count = 0;

        filters.forEach(item => {
            const active = item === button;

            item.classList.toggle("active", active);

            item.setAttribute(
                "aria-pressed",
                String(active)
            );
        });

        games.forEach(game => {
            const show =
                selected === "all" ||
                game.dataset.status === selected;

            game.hidden = !show;

            if (show) {
                count++;
            }
        });

        visibleCount.textContent =
            count + " " + gameWord(count);
    });
});
