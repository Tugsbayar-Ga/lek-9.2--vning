// Elementreferenser
const input = document.getElementById("todoInput");
const ul = document.getElementById("todoList");
const pText = document.querySelector("p.text");
const ny_text = document.getElementById("ny_text");
const body = document.body;
const föreBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const tillbakaBtn = document.getElementById("gåTillbakaBtn");

const allSections = document.querySelectorAll(".text-section, .todo-section, h2, .theme-section, .link-section");

// Lista med bilder - index 0 = bild 1, index 1 = bild 2
const bilder = ['./bild/album1.gif', './bild/album2.webp'];
let currentBild = 0;

// ── TODO ──────────────────────────────────────────
function addTodo() {
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", () => li.remove());
    ul.appendChild(li);
    input.value = "";
}

function removeTodo() {
    const text = input.value.trim();
    if (!text) return;
    let found = false;
    ul.querySelectorAll("li").forEach(li => {
        if (li.textContent === text) { li.remove(); found = true; }
    });
    if (!found) alert("Hittades inte i listan.");
    input.value = "";
}

function removeAllTodos() { ul.innerHTML = ""; }

input.addEventListener("keypress", e => { if (e.key === "Enter") addTodo(); });

// ── TEXT ──────────────────────────────────────────
function lägg_till() {
    if (ny_text.value.trim() !== "") {
        pText.textContent = ny_text.value;
        ny_text.value = "";
    }
}

// ── TEMA ──────────────────────────────────────────
function växla_tema() { body.classList.toggle("dark_mode"); }

// ── BILDER ────────────────────────────────────────
// Bild 1 (index 0) och Bild 2 (index 1) fungerar nu exakt likadant
function visaBild(index) {
    currentBild = index;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
    body.classList.add("fullscreen-bg");
    allSections.forEach(sec => sec.style.display = "none");
    tillbakaBtn.style.display = "inline-block";
    föreBtn.style.display    = "inline-block";
    nextBtn.style.display    = "inline-block";
}

function föregåendeBild() {
    currentBild = (currentBild - 1 + bilder.length) % bilder.length;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
}

function nästaBild() {
    currentBild = (currentBild + 1) % bilder.length;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
}

function gåTillbaka() {
    body.style.backgroundImage = "";
    body.classList.remove("fullscreen-bg");
    allSections.forEach(sec => sec.style.display = "");
    tillbakaBtn.style.display = "none";
    föreBtn.style.display    = "none";
    nextBtn.style.display    = "none";
}