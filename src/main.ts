import "./style.css";

// =============================================================================
// STATE
// =============================================================================

let counter: number = 0;
let growthRate: number = 0; // stars per second
let lastTime: number = performance.now();

// =============================================================================
// CONFIG
// =============================================================================

const UPGRADE_COST = 10;
const UPGRADE_RATE = 1;

// =============================================================================
// PAGE LAYOUT SETUP
// =============================================================================

document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.minHeight = "100vh";
document.body.style.fontFamily = "Arial, sans-serif";

// =============================================================================
// DOM ELEMENTS
// =============================================================================

const counterDisplay = document.createElement("div");
counterDisplay.style.fontSize = "24px";
counterDisplay.style.textAlign = "center";
document.body.appendChild(counterDisplay);

const clickButton = document.createElement("button");
clickButton.innerHTML = `⭐️ Click for more stars!`;
clickButton.style.padding = "12px 24px";
clickButton.style.fontSize = "16px";
document.body.appendChild(clickButton);

const buyButton = document.createElement("button");
buyButton.textContent = `Buy Auto-Clicker (${UPGRADE_COST} stars)`;
buyButton.style.marginTop = "10px";
buyButton.style.padding = "10px 16px";
buyButton.style.fontSize = "16px";
buyButton.disabled = true; // Start disabled
document.body.appendChild(buyButton);

// =============================================================================
// UPDATE LOGIC
// =============================================================================

const updateDisplay = (): void => {
  counterDisplay.textContent = `${counter.toFixed(2)} stars (${
    growthRate.toFixed(2)
  } stars/sec)`;
  buyButton.disabled = counter < UPGRADE_COST;
};

// Handle manual click
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Handle upgrade purchase
buyButton.addEventListener("click", () => {
  if (counter >= UPGRADE_COST) {
    counter -= UPGRADE_COST;
    growthRate += UPGRADE_RATE;
    updateDisplay();
  }
});

// =============================================================================
// GAME LOOP (requestAnimationFrame)
// =============================================================================

const gameLoop = (currentTime: number): void => {
  const deltaTime = (currentTime - lastTime) / 1000; // seconds
  lastTime = currentTime;

  counter += growthRate * deltaTime;
  updateDisplay();

  requestAnimationFrame(gameLoop);
};

// =============================================================================
// INITIALIZATION
// =============================================================================

updateDisplay(); // Initial render
requestAnimationFrame(gameLoop);
