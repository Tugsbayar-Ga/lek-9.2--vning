// Elementreferenser
const input = document.getElementById("todoInput");
const ul = document.getElementById("todoList");
const rubrik = document.querySelector("h1");
const pText = document.querySelector("p.text");
const ny_text = document.getElementById("ny_text");
const body = document.body;
const gåTillbaka = document.getElementById("gåTillbaka");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const allSections = document.querySelectorAll(".text-section, .todo-section, h2, .theme-section");

// Lista med bilder
const bilder = ['./bild/album1.gif', './bild/album2.webp'];
let currentBild = 0;

// TODO-funktioner
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

// Ändra text
function lägg_till() {
    if (ny_text.value.trim() !== "") { pText.textContent = ny_text.value; ny_text.value = ""; }
}

// Växla tema
function växla_tema() { body.classList.toggle("dark_mode"); }

// Visa bild fullscreen
function visaBild(index) 
{
    currentBild = index;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
    body.classList.add("fullscreen-bg");
    allSections.forEach(sec => sec.style.display = "none");
    gåTillbaka.style.display = "inline-block";
    prev.style.display = "inline-block";
    next.style.display = "inline-block";
}

// Föregående/Nästa bild
function föregåendeBild() { 
    currentBild = (currentBild - 1 + bilder.length) % bilder.length;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
}
function nästaBild() { 
    currentBild = (currentBild + 1) % bilder.length;
    body.style.backgroundImage = `url('${bilder[currentBild]}')`;
}

// Gå tillbaka
function gåTillbaka() 
{
    body.style.backgroundImage = "";
    body.classList.remove("fullscreen-bg");
    allSections.forEach(sec => sec.style.display = "");
    gåTillbaka.style.display = "none";
    prev.style.display = "none";
    next.style.display = "none";
}