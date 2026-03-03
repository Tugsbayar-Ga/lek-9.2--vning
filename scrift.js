// Elementreferenser
const input = document.getElementById("todoInput");
const ul = document.getElementById("todoList");
const rubrik = document.querySelector("h1");
const pText = document.querySelector("p.text");
const ny_text = document.getElementById("ny_text");
const body = document.body;

// --- TODO-funktioner ---
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.textContent = text;

    // Klicka för att ta bort
    li.addEventListener("click", () => li.remove());

    ul.appendChild(li);
    input.value = "";
}

function removeTodo() {
    const text = input.value.trim();
    if (!text) return;

    let found = false;

    ul.querySelectorAll("li").forEach(li => {
        if (li.textContent === text) {
            li.remove();
            found = true;
        }
    });

    if (!found) alert("Hittades inte i listan.");

    input.value = "";
}

function removeAllTodos() {
    ul.innerHTML = "";
}

// Lägg till todo med Enter
input.addEventListener("keypress", e => {
    if (e.key === "Enter") addTodo();
});

// --- Ändra text ---
function lägg_till() {
    if (ny_text.value.trim() !== "") {
        pText.textContent = ny_text.value;
        ny_text.value = "";
    }
}

// --- Växla tema ---
function växla_tema() {
    body.classList.toggle("dark_mode");
}

// --- Bakgrund ---
let bgState = {};

function byt_bild(fil_sökväg) {
    if (!bgState[fil_sökväg]) bgState[fil_sökväg] = 0;

    const elementsToHide = [rubrik, pText, ul, document.querySelector("h2")];

    bgState[fil_sökväg] = (bgState[fil_sökväg] + 1) % 2;

    if (bgState[fil_sökväg] === 0) {
        body.style.backgroundImage = "";
        body.style.backgroundColor = "rgb(218, 71, 255)";
        elementsToHide.forEach(el => el.style.display = "");
    } else {
        body.style.backgroundImage = `url('${fil_sökväg}')`;
        body.style.backgroundSize = "100% auto";
        body.style.backgroundRepeat = "repeat-y";
        body.style.backgroundPosition = "top center";
        elementsToHide.forEach(el => el.style.display = "none");
    }
}