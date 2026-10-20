// PL: Włącza tryb ścisły JavaScript, który pomaga wychwytywać błędy.
// EN: Enables JavaScript strict mode, which helps catch coding errors.
"use strict";

// PL: const tworzy stałą, czyli zmienną, której nie można przypisać nowej wartości.
// EN: const declares a variable that cannot be reassigned.
// PL: translations to obiekt zawierający wszystkie tłumaczenia strony.
// EN: translations is an object containing all website translations.
const translations = {

    // PL: pl przechowuje polską wersję tekstów wyświetlanych na stronie.
    // EN: pl stores the Polish version of the website text.
    pl: {

        // PL: games to tekst linku nawigacyjnego prowadzącego do sekcji gier.
        // EN: games is the navigation link text for the games section.
        games: "Gry",

        // PL: languageLabel to podpis pola wyboru języka.
        // EN: languageLabel is the label for the language selector.
        languageLabel: "Język",

        // PL: collection to informacja o liczbie gier w kolekcji.
        // EN: collection displays the number of games in the collection.
        collection: "1 GRA W KOLEKCJI",

        // PL: welcome to napis powitalny nad głównym tytułem.
        // EN: welcome is the small welcome text above the main heading.
        welcome: "TWOJE CENTRUM GIER",

        // PL: heroFirst to pierwsza linia dużego nagłówka.
        // EN: heroFirst is the first line of the main heading.
        heroFirst: "JEDNA GRA.",

        // PL: heroSecond to druga linia nagłówka z nazwą gry.
        // EN: heroSecond is the second heading line showing the game name.
        heroSecond: "SNAKE WORLD.",

        // PL: goToGame to napis przycisku przewijającego stronę do gry.
        // EN: goToGame is the button text for scrolling to the game section.
        goToGame: "PRZEJDŹ DO GRY",

        // PL: playSnake to napis przycisku uruchamiającego Snake World.
        // EN: playSnake is the button text for launching Snake World.
        playSnake: "ZAGRAJ W SNAKE",

        // PL: availableGame opisuje liczbę dostępnych gier w statystykach.
        // EN: availableGame labels the available game statistic.
        availableGame: "GRA DOSTĘPNA",

        // PL: ranking to podpis statystyki informującej o rankingu.
        // EN: ranking labels the in-game leaderboard statistic.
        ranking: "RANKING W GRZE",

        // PL: fun to podpis ozdobnej statystyki z symbolem nieskończoności.
        // EN: fun labels the decorative infinity statistic.
        fun: "ZABAWA",

        // PL: preview to tytuł ozdobnego podglądu Snake'a.
        // EN: preview is the title of the decorative Snake preview.
        preview: "PODGLĄD // SNAKE WORLD",

        // PL: previewScore to przykładowy wynik pokazany na podglądzie.
        // EN: previewScore is the sample score shown in the preview.
        previewScore: "WYNIK: 0240",

        // PL: library to napis nad biblioteką gier.
        // EN: library is the label above the game library.
        library: "BIBLIOTEKA GIER",

        // PL: availableTitle to nagłówek sekcji z dostępną grą.
        // EN: availableTitle is the heading for the available game section.
        availableTitle: "DOSTĘPNA GRA",

        // PL: oneGame pokazuje informację, że dostępna jest jedna gra.
        // EN: oneGame indicates that one game is available.
        oneGame: "1 gra",

        // PL: available to zielony status przy karcie Snake World.
        // EN: available is the green status label on the Snake World card.
        available: "DOSTĘPNA",

        // PL: snakeDescription jest kluczem opisu gry Snake World.
        // EN: snakeDescription is the translation key for the Snake description.
        snakeDescription:

            // PL: Ten tekst opisuje funkcje gry w języku polskim.
            // EN: This text describes the game features in Polish.
            "Klasyczny Snake z czterema mapami, rankingiem TOP 10, poziomami trudności, odliczaniem i własnymi ustawieniami.",

        // PL: onePlayer to etykieta informująca o liczbie graczy.
        // EN: onePlayer labels the number of players.
        onePlayer: "1 GRACZ",

        // PL: playNow to napis głównego przycisku na karcie gry.
        // EN: playNow is the main action text on the game card.
        playNow: "ZAGRAJ TERAZ",

        // PL: footer to tekst w stopce o użytych technologiach.
        // EN: footer is the footer text describing the technologies used.
        footer: "ZBUDOWANO W HTML, CSS I JAVASCRIPT"

    // PL: Zamykamy obiekt z polskimi tłumaczeniami.
    // EN: Closes the Polish translations object.
    },

    // PL: en to obiekt z angielskimi tłumaczeniami strony.
    // EN: en is the object containing English website translations.
    en: {

        // PL: Angielska wersja linku „Gry”.
        // EN: English version of the Games navigation link.
        games: "Games",

        // PL: Angielski podpis wyboru języka.
        // EN: English label for the language selector.
        languageLabel: "Language",

        // PL: Angielska informacja o jednej grze w kolekcji.
        // EN: English information about one game in the collection.
        collection: "1 GAME IN COLLECTION",

        // PL: Angielska wersja napisu powitalnego.
        // EN: English version of the welcome label.
        welcome: "YOUR GAMING HUB",

        // PL: Angielska wersja pierwszej linii nagłówka.
        // EN: English version of the first heading line.
        heroFirst: "ONE GAME.",

        // PL: Nazwa gry pozostaje bez zmian.
        // EN: The game title remains unchanged.
        heroSecond: "SNAKE WORLD.",

        // PL: Angielski napis przycisku przejścia do gry.
        // EN: English text for the game section button.
        goToGame: "GO TO GAME",

        // PL: Angielski napis przycisku uruchamiającego Snake'a.
        // EN: English text for the Snake launch button.
        playSnake: "PLAY SNAKE",

        // PL: Angielska etykieta dostępnej gry.
        // EN: English label for the available game statistic.
        availableGame: "AVAILABLE GAME",

        // PL: Angielski podpis informacji o rankingu.
        // EN: English label for the game leaderboard.
        ranking: "IN-GAME LEADERBOARD",

        // PL: Angielski podpis ozdobnej statystyki.
        // EN: English label for the decorative statistic.
        fun: "FUN",

        // PL: Angielska wersja tytułu podglądu gry.
        // EN: English version of the game preview title.
        preview: "PREVIEW // SNAKE WORLD",

        // PL: Angielska wersja przykładowego wyniku.
        // EN: English version of the sample score.
        previewScore: "SCORE: 0240",

        // PL: Angielska nazwa biblioteki gier.
        // EN: English title of the game library.
        library: "GAME LIBRARY",

        // PL: Angielski nagłówek sekcji z dostępną grą.
        // EN: English heading of the available game section.
        availableTitle: "AVAILABLE GAME",

        // PL: Angielska informacja o jednej grze.
        // EN: English text indicating one game.
        oneGame: "1 game",

        // PL: Angielski status dostępności Snake World.
        // EN: English availability status for Snake World.
        available: "AVAILABLE",

        // PL: Klucz opisu gry w wersji angielskiej.
        // EN: Translation key for the English game description.
        snakeDescription:

            // PL: Angielski opis czterech map, rankingu i pozostałych funkcji.
            // EN: English description of the maps, ranking and other features.
            "Classic Snake with four maps, a TOP 10 leaderboard, difficulty levels, a start countdown and customizable settings.",

        // PL: Angielski napis informujący o jednym graczu.
        // EN: English text indicating one player.
        onePlayer: "1 PLAYER",

        // PL: Angielski napis przycisku uruchamiającego grę.
        // EN: English text for the Play Now button.
        playNow: "PLAY NOW",

        // PL: Angielski tekst stopki o technologiach.
        // EN: English footer text about the technologies used.
        footer: "BUILT WITH HTML, CSS & JAVASCRIPT"

    // PL: Zamykamy obiekt angielskich tłumaczeń.
    // EN: Closes the English translations object.
    }

// PL: Zamyka cały obiekt translations; średnik kończy instrukcję.
// EN: Closes the translations object; the semicolon ends the statement.
};

// PL: function definiuje funkcję, czyli blok kodu wykonujący określone zadanie.
// EN: function defines a reusable block of code.

// PL: loadLanguage odczytuje wcześniej zapisany język strony.
// EN: loadLanguage reads the previously saved website language.
function loadLanguage() {

    // PL: try próbuje wykonać kod, który może spowodować błąd.
    // EN: try runs code that might throw an error.
    try {

        // PL: const saved tworzy stałą przechowującą odczytaną wartość.
        // EN: const saved stores the value retrieved from browser storage.
        // PL: localStorage przechowuje dane w przeglądarce między odwiedzinami.
        // EN: localStorage keeps data between browser visits.
        // PL: getItem pobiera wartość zapisaną pod kluczem "snake-language".
        // EN: getItem reads the value stored under "snake-language".
        const saved = localStorage.getItem("snake-language");


        // PL: return zwraca wynik działania funkcji.
        // EN: return sends a result back from the function.
        // PL: === sprawdza, czy wartość jest dokładnie równa "en".
        // EN: === checks whether a value is exactly equal to "en".
        // PL: ? : to operator warunkowy — wybiera jedną z dwóch wartości.
        // EN: ? : is a conditional operator that selects between two values.
        // PL: Jeśli zapisany język to angielski, zwraca "en"; inaczej "pl".
        // EN: Returns "en" if English was saved; otherwise returns "pl".
        return saved === "en" ? "en" : "pl";

    // PL: catch uruchamia się, jeśli w bloku try wystąpi błąd.
    // EN: catch runs if an error occurs inside the try block.
    } catch {

        // PL: Jeżeli nie uda się odczytać pamięci, wybieramy polski.
        // EN: Falls back to Polish if browser storage cannot be accessed.
        return "pl";

    // PL: Kończy obsługę błędu.
    // EN: Ends the error handling block.
    }

// PL: Kończy funkcję loadLanguage.
// EN: Ends the loadLanguage function.
}

// PL: saveLanguage przyjmuje parametr language, czyli wybrany język.
// EN: saveLanguage receives a language parameter containing the chosen language.
function saveLanguage(language) {

    // PL: Próbujemy zapisać wybór języka w przeglądarce.
    // EN: Attempts to store the selected language in the browser.
    try {

        // PL: setItem zapisuje dane w localStorage.
        // EN: setItem writes a value to localStorage.

        // PL: "snake-language" to nazwa klucza, a language to zapisywana wartość.
        // EN: "snake-language" is the storage key, and language is its value.

        // PL: Używamy tego samego klucza co Snake, aby oba projekty współdzieliły język.
        // EN: Uses the same key as Snake so the menu and game can share a language.
        localStorage.setItem("snake-language", language);

    // PL: catch przechwytuje ewentualny błąd zapisywania.
    // EN: catch handles any storage-related error.
    } catch {

        // PL: Pusty blok oznacza, że ignorujemy błąd zapisu.
        // EN: An empty block means the saving error is ignored.

    // PL: Zamyka blok catch.
    // EN: Closes the catch block.
    }

// PL: Zamyka funkcję saveLanguage.
// EN: Ends the saveLanguage function.
}

// ZMIANA JĘZYKA STRONY / LANGUAGE SWITCHING

// PL: changeLanguage otrzymuje język i aktualizuje napisy na stronie.
// EN: changeLanguage receives a language and updates the page text.
function changeLanguage(language) {

    // PL: translations[language] pobiera tłumaczenia wybranego języka.
    // EN: translations[language] accesses the selected language translations.

    // PL: ! oznacza zaprzeczenie — sprawdzamy, czy języka nie ma w obiekcie.
    // EN: ! is logical NOT, used here to detect an unsupported language.
    if (!translations[language]) {

        // PL: Jeśli język jest nieznany, ustawiamy polski jako domyślny.
        // EN: Uses Polish as the default when the language is not supported.
        language = "pl";

    // PL: Zamyka instrukcję warunkową if.
    // EN: Closes the if statement.
    }


    // PL: W tej części tłumaczymy wszystkie elementy strony.
    // EN: This section translates all page elements.

    // PL: texts przechowuje odpowiedni zestaw tłumaczeń, np. translations.en.
    // EN: texts holds the selected translation set, such as translations.en.
    const texts = translations[language];


    // PL: document oznacza aktualny dokument HTML.
    // EN: document represents the current HTML document.

    // PL: documentElement wskazuje główny element html.
    // EN: documentElement refers to the root html element.

    // PL: lang ustawia kod języka dokumentu.
    // EN: lang sets the document language code.

    // PL: Zmieniamy np. <html lang="pl"> na <html lang="en">.
    // EN: Changes the HTML language from Polish to English when selected.
    document.documentElement.lang = language;


    // PL: querySelectorAll wyszukuje wszystkie elementy pasujące do selektora.
    // EN: querySelectorAll finds all elements matching a CSS selector.

    // PL: [data-i18n] oznacza elementy HTML posiadające atrybut data-i18n.
    // EN: [data-i18n] selects HTML elements with a data-i18n attribute.

    // PL: forEach wykonuje funkcję osobno dla każdego znalezionego elementu.
    // EN: forEach runs a function for each matching element.
    document.querySelectorAll("[data-i18n]").forEach(element => {

        // PL: dataset umożliwia odczyt atrybutów data-* z HTML.
        // EN: dataset provides access to HTML data-* attributes.

        // PL: dataset.i18n odczytuje np. data-i18n="playNow".
        // EN: dataset.i18n reads a key such as data-i18n="playNow".

        // PL: Zmienna key przechowuje nazwę tekstu do przetłumaczenia.
        // EN: key stores the translation key for this element.
        const key = element.dataset.i18n;


        // PL: Object.prototype.hasOwnProperty.call sprawdza, czy obiekt zawiera dany klucz.
        // EN: Object.prototype.hasOwnProperty.call checks whether an object owns a key.

        // PL: Używamy tego, aby nie pobierać tłumaczenia, którego nie zdefiniowano.
        // EN: Prevents trying to use a translation that has not been defined.
        if (Object.prototype.hasOwnProperty.call(texts, key)) {

            // PL: textContent zmienia tekst znajdujący się wewnątrz elementu HTML.
            // EN: textContent changes the text inside an HTML element.

            // PL: texts[key] pobiera odpowiednie tłumaczenie.
            // EN: texts[key] retrieves the matching translated text.

            // PL: Np. napis "ZAGRAJ TERAZ" zostanie zmieniony na "PLAY NOW".
            // EN: For example, "ZAGRAJ TERAZ" becomes "PLAY NOW".
            element.textContent = texts[key];

        // PL: Zamyka warunek sprawdzający dostępność tłumaczenia.
        // EN: Closes the translation availability check.
        }

    // PL: Zamyka funkcję forEach przeglądającą elementy strony.
    // EN: Ends the forEach callback used to translate page elements.
    });


    // PL: document.title ustawia tytuł karty przeglądarki.
    // EN: document.title sets the browser tab title.

    // PL: Nazwa Arcade Hub pozostaje taka sama w obu językach.
    // EN: The Arcade Hub title stays the same in both languages.
    document.title = "Arcade Hub — Snake World";


    // PL: querySelector wyszukuje pierwszy element pasujący do selektora.
    // EN: querySelector finds the first element matching a CSS selector.

    // PL: Szukamy znacznika meta, którego atrybut name ma wartość description.
    // EN: Finds the meta element whose name attribute equals description.
    const description = document.querySelector(
        'meta[name="description"]'
    );


    // PL: if sprawdza, czy udało się znaleźć element description.
    // EN: if checks whether the description element exists.
    if (description) {

        // PL: description.content pozwala zmienić opis strony.
        // EN: description.content updates the page description.

        // PL: Operator === sprawdza, czy wybrano język polski.
        // EN: The === operator checks whether Polish is selected.

        // PL: Operator ? : wybiera polski lub angielski opis.
        // EN: The ? : operator chooses the Polish or English description.
        description.content = language === "pl"

            // PL: Jeśli język to polski, używamy polskiego opisu.
            // EN: Uses the Polish page description when Polish is selected.
            ? "Arcade Hub — zagraj w Snake World."

            // PL: W innym przypadku ustawiamy angielski opis.
            // EN: Otherwise, sets the English page description.
            : "Arcade Hub — play Snake World.";

    // PL: Zamyka warunek dotyczący opisu strony.
    // EN: Closes the description update condition.
    }


    // PL: Szuka elementu posiadającego klasę nav.
    // EN: Finds the element with the nav class.
    const navigation = document.querySelector(".nav");


    // PL: Sprawdzamy, czy pasek nawigacji istnieje.
    // EN: Checks whether the navigation element exists.
    if (navigation) {

        // PL: setAttribute ustawia lub zmienia atrybut elementu HTML.
        // EN: setAttribute sets or updates an HTML attribute.

        // PL: aria-label to opis nawigacji dla technologii wspomagających.
        // EN: aria-label provides an accessible name for assistive technologies.
        navigation.setAttribute(

            // PL: Wskazujemy atrybut, który chcemy zmienić.
            // EN: Specifies the attribute to update.
            "aria-label",

            // PL: Sprawdzamy, czy język strony jest polski.
            // EN: Checks whether the selected language is Polish.
            language === "pl"

                // PL: Ustawia polską nazwę nawigacji.
                // EN: Sets the Polish navigation label.
                ? "Nawigacja główna"

                // PL: Ustawia angielską nazwę nawigacji.
                // EN: Sets the English navigation label.
                : "Main navigation"

        // PL: Kończy wywołanie setAttribute.
        // EN: Ends the setAttribute function call.
        );

    // PL: Zamyka warunek dotyczący nawigacji.
    // EN: Closes the navigation condition.
    }


    // PL: Szuka elementu HTML z klasą logo.
    // EN: Finds the HTML element with the logo class.
    const logo = document.querySelector(".logo");


    // PL: Sprawdzamy, czy na stronie znajduje się logo.
    // EN: Checks whether the logo exists on the page.
    if (logo) {

        // PL: Zmieniamy opis linku z logo w zależności od języka.
        // EN: Updates the logo link's accessible label based on language.
        logo.setAttribute(

            // PL: Modyfikujemy atrybut aria-label.
            // EN: Updates the aria-label attribute.
            "aria-label",

            // PL: Sprawdzamy, czy aktualnym językiem jest polski.
            // EN: Checks if Polish is the currently selected language.
            language === "pl"

                // PL: Polska nazwa linku prowadzącego do strony głównej.
                // EN: Polish accessible name for the home page link.
                ? "Arcade Hub — strona główna"

                // PL: Angielska nazwa linku prowadzącego do strony głównej.
                // EN: English accessible name for the home page link.
                : "Arcade Hub — home page"

        // PL: Kończy aktualizację atrybutu logo.
        // EN: Ends the logo attribute update.
        );

    // PL: Zamyka warunek dotyczący logo.
    // EN: Closes the logo condition.
    }


    // PL: getElementById znajduje element posiadający podane id.
    // EN: getElementById finds an element by its ID.

    // PL: Szukamy rozwijanej listy o id="language-select".
    // EN: Finds the language dropdown with id="language-select".
    const selector = document.getElementById("language-select");


    // PL: Sprawdzamy, czy lista wyboru języka istnieje.
    // EN: Checks whether the language selector exists.
    if (selector) {

        // PL: value ustawia wartość wybraną w elemencie select.
        // EN: value sets the selected value of a dropdown.

        // PL: Np. jeśli wybrano angielski, zaznacza opcję value="en".
        // EN: For English, selects the option with value="en".
        selector.value = language;

    // PL: Zamyka warunek dotyczący listy języków.
    // EN: Closes the language selector condition.
    }


    // PL: Wywołuje funkcję saveLanguage i zapisuje aktualny język.
    // EN: Calls saveLanguage to store the currently selected language.
    saveLanguage(language);

// PL: Zamyka funkcję changeLanguage.
// EN: Ends the changeLanguage function.
}

// URUCHAMIANIE MENU / MENU INITIALIZATION

// PL: startMenu przygotowuje wybór języka przy otwieraniu strony.
// EN: startMenu initializes language selection when the page loads.
function startMenu() {

    // PL: Pobieramy listę języków z dokumentu HTML.
    // EN: Gets the language dropdown from the HTML document.
    const languageSelect = document.getElementById("language-select");


    // PL: loadLanguage odczytuje język zapisany w przeglądarce.
    // EN: loadLanguage reads the saved language from browser storage.

    // PL: changeLanguage ustawia odczytany język na stronie.
    // EN: changeLanguage applies the saved language to the page.

    // PL: Dzięki temu język zostaje zachowany po odświeżeniu.
    // EN: This keeps the selected language after refreshing the page.
    changeLanguage(loadLanguage());


    // PL: Sprawdzamy, czy istnieje rozwijana lista języków.
    // EN: Checks whether the language dropdown exists.
    if (languageSelect) {

        // PL: addEventListener nasłuchuje zdarzeń na elemencie.
        // EN: addEventListener listens for events on an element.

        // PL: change to zdarzenie wywoływane po wybraniu innej opcji.
        // EN: change fires when the user selects a different option.

        // PL: Funkcja strzałkowa () => uruchamia kod po zmianie języka.
        // EN: The arrow function () => runs when the language selection changes.
        languageSelect.addEventListener("change", () => {

            // PL: Odczytuje nową wartość z listy i zmienia język strony.
            // EN: Reads the newly selected value and updates the page language.
            changeLanguage(languageSelect.value);

        // PL: Kończy funkcję reagującą na zmianę języka.
        // EN: Ends the language change event callback.
        });

    // PL: Zamyka sprawdzenie istnienia listy języków.
    // EN: Closes the language selector check.
    }

// PL: Kończy funkcję startMenu.
// EN: Ends the startMenu function.
}

// AUTOMATYCZNY START / AUTOMATIC START

// PL: document.readyState informuje, na jakim etapie jest wczytywanie dokumentu.
// EN: document.readyState indicates the current document loading state.

// PL: "loading" oznacza, że przeglądarka nadal odczytuje HTML.
// EN: "loading" means the browser is still parsing the HTML.

// PL: Jeśli dokument jeszcze się ładuje, czekamy na jego zakończenie.
// EN: If the document is still loading, wait until it is ready.
if (document.readyState === "loading") {

    // PL: DOMContentLoaded uruchamia się, gdy struktura HTML jest już odczytana.
    // EN: DOMContentLoaded fires when the HTML structure has been parsed.

    // PL: Dzięki temu JavaScript nie próbuje obsługiwać elementów przed ich utworzeniem.
    // EN: Prevents JavaScript from accessing elements before they exist.
    document.addEventListener(

        // PL: Nazwa zdarzenia, na które czekamy.
        // EN: The name of the event to listen for.
        "DOMContentLoaded",

        // PL: Funkcja startMenu zostanie uruchomiona po wczytaniu HTML.
        // EN: startMenu will run after the HTML has been parsed.
        startMenu,

        // PL: Trzeci argument to obiekt z ustawieniami nasłuchiwania.
        // EN: The third argument is an event listener options object.
        {

            // PL: once: true oznacza, że funkcja ma wykonać się tylko jeden raz.
            // EN: once: true means the listener will run only once.
            once: true

        // PL: Zamyka obiekt ustawień zdarzenia.
        // EN: Closes the event listener options object.
        }

    // PL: Kończy dodawanie nasłuchiwania zdarzenia.
    // EN: Ends the addEventListener call.
    );

// PL: else oznacza wykonanie innego kodu, gdy warunek if jest fałszywy.
// EN: else runs an alternative block when the if condition is false.
} else {

    // PL: Jeśli HTML jest już gotowy, od razu uruchamiamy menu.
    // EN: If the HTML is already ready, initializes the menu immediately.
    startMenu();

// PL: Zamyka instrukcję if / else.
// EN: Closes the if / else statement.
}
