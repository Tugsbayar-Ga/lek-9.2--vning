const display = document.getElementById("display");
let currentInput = "0";
let justCalculated = false;

function updateDisplay() { display.value = currentInput; }

function appendToDisplay(value) {
if (justCalculated && !isNaN(value)) {
    currentInput = value;
    justCalculated = false;
} else if (justCalculated) {
    justCalculated = false;
    currentInput += value;
} else {
    currentInput = (currentInput === "0" && !isNaN(value)) ? value : currentInput + value;
}
updateDisplay();
}

function clearDisplay() { currentInput = "0"; justCalculated = false; updateDisplay(); }

function calculate() {
try {
    let expr = currentInput.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    let result = Function('"use strict"; return (' + expr + ')')();
    currentInput = isFinite(result) ? parseFloat(result.toFixed(10)).toString() : "Fel";
    justCalculated = true;
} catch (e) {
    currentInput = "Fel";
    justCalculated = true;
}
updateDisplay();
}

document.addEventListener("keydown", e => {
if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
else if (['+','-','*','/','%','.'].includes(e.key)) appendToDisplay(e.key);
else if (e.key === 'Enter' || e.key === '=') calculate();
else if (e.key === 'Backspace') { currentInput = currentInput.length > 1 ? currentInput.slice(0,-1) : "0"; updateDisplay(); }
else if (e.key === 'Escape') clearDisplay();
});