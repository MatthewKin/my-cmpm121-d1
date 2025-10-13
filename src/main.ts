import "./style.css";

// =============================================================================
// STATE (PEE PEE POO POO)
// =============================================================================

let counter: number = 0;
let growthRate: number = 0; // stars per second
let lastTime: number = performance.now();
let lastStarBatch: number = 0; // 🌠 tracks last milestone batch (e.g., 320)
let lastSpawnCheck: number = performance.now(); // 🌠 last time we checked for stars

type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement;
};

const upgrades: Upgrade[] = [
  { name: "Satellite Array 🛰️", cost: 10, rate: 0.1, count: 0 },
  { name: "Nova Beacon ✨", cost: 100, rate: 2.0, count: 0 },
  { name: "Galaxy 🌌", cost: 1000, rate: 50, count: 0 },
];

// =============================================================================
// PAGE LAYOUT SETUP  (PEE PEE POO POO)
// =============================================================================

document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.minHeight = "100vh";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.color = "white";
document.body.style.background =
  "linear-gradient(270deg, #1b003a, #240046, #3c096c)";
document.body.style.backgroundSize = "600% 600%";

document.body.animate(
  [
    { backgroundPosition: "0% 50%" },
    { backgroundPosition: "100% 50%" },
    { backgroundPosition: "0% 50%" },
  ],
  {
    duration: 2000,
    iterations: Infinity,
  },
);

// =============================================================================
// DOM ELEMENTS  (PEE PEE POO POO)
// =============================================================================

const counterDisplay = document.createElement("div");
counterDisplay.style.fontSize = "24px";
counterDisplay.style.textAlign = "center";
document.body.appendChild(counterDisplay);

const growthDisplay = document.createElement("div");
growthDisplay.style.fontSize = "18px";
growthDisplay.style.textAlign = "center";
growthDisplay.style.marginBottom = "12px";
document.body.appendChild(growthDisplay);

const clickButton = document.createElement("button");
clickButton.innerHTML = `⭐️ Click for Stardust!`;
clickButton.style.padding = "12px 24px";
clickButton.style.fontSize = "16px";
clickButton.style.marginBottom = "16px";
document.body.appendChild(clickButton);

// Container for upgrade buttons
const upgradeContainer = document.createElement("div");
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.alignItems = "center";
document.body.appendChild(upgradeContainer);

// Create and store buttons for each upgrade
upgrades.forEach((upgrade) => {
  const button = document.createElement("button");
  button.style.margin = "6px";
  button.style.padding = "10px 16px";
  button.style.fontSize = "16px";
  button.disabled = true;
  upgradeContainer.appendChild(button);
  upgrade.button = button;
});

// =============================================================================
// SHOOTING STAR EFFECT 🌠
// =============================================================================

const spawnShootingStar = (): void => {
  const star = document.createElement("div");
  star.textContent = "⭐";
  star.style.position = "fixed";
  star.style.left = `${Math.random() * window.innerWidth}px`;
  star.style.top = `${Math.random() * 100}px`;
  star.style.fontSize = `${24 + Math.random() * 6}px`;
  star.style.opacity = "0.8";
  star.style.pointerEvents = "none";
  star.style.transition = "transform 1s linear, opacity 1s ease-out";

  document.body.appendChild(star);

  // Random diagonal direction
  const endX = Math.random() * 200 - 100;
  const endY = window.innerHeight + 50;

  requestAnimationFrame(() => {
    star.style.transform = `translate(${endX}px, ${endY}px) rotate(45deg)`;
    star.style.opacity = "0";
  });

  // Remove after animation
  setTimeout(() => star.remove(), 1000);
};

// =============================================================================
// UPDATE LOGIC  (PEE PEE POO POO)
// =============================================================================

const updateDisplay = (): void => {
  counterDisplay.textContent = `${counter.toFixed(2)} stars (${
    growthRate.toFixed(2)
  } stars/sec)`;

  upgrades.forEach((u) => {
    if (u.button) {
      u.button.disabled = counter < u.cost;
      u.button.textContent =
        `Buy ${u.name} (${u.cost} stars) — owned: ${u.count}`;
    }
  });
};

// Handle manual click
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Handle upgrade purchase (with price increase)
upgrades.forEach((u) => {
  u.button?.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      u.count++;
      growthRate += u.rate;

      // 💸 Increase cost by 15% after each purchase
      u.cost = parseFloat((u.cost * 1.15).toFixed(2));

      updateDisplay();
    }
  });
});

// =============================================================================
// GAME LOOP (requestAnimationFrame)  (PEE PEE POO POO)
// =============================================================================

const gameLoop = (currentTime: number): void => {
  const deltaTime = (currentTime - lastTime) / 1000; // seconds
  lastTime = currentTime;

  // Passive growth
  counter += growthRate * deltaTime;

  // 🌠 Check for shooting stars every second
  if (currentTime - lastSpawnCheck >= 1000) {
    lastSpawnCheck = currentTime;

    // Calculate how many stars to spawn based on current total
    const starsToSpawn = Math.floor(counter / 5);

    console.log(
      `[DEBUG] ${new Date().toLocaleTimeString()} → ${
        counter.toFixed(
          2,
        )
      } stars → spawning ${starsToSpawn} shooting stars`,
    );

    for (let i = 0; i < starsToSpawn; i++) {
      setTimeout(() => {
        console.log(`[DEBUG] Shooting star #${i + 1} fired correctly`);
        spawnShootingStar();
      }, i * 100); // small delay for cascade effect
    }
  }

  updateDisplay();
  requestAnimationFrame(gameLoop);
};

// =============================================================================
// INITIALIZATION  (PEE PEE POO POO)
// =============================================================================

updateDisplay(); // Initial render
requestAnimationFrame(gameLoop);
