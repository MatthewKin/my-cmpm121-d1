import "./style.css";

// =============================================================================
// STATE
// =============================================================================

let counter: number = 0;
let growthRate: number = 0; // stars per second
let lastTime: number = performance.now();
let lastSpawnCheck: number = performance.now(); // 🌠 last time we checked for stars

interface Item {
  name: string;
  purchaseCost: number;
  rate: number;
  count: number;
  description: string;
  button?: HTMLButtonElement;
}

const availableItems: Item[] = [
  {
    name: "Satellite Array 🛰️",
    purchaseCost: 10,
    rate: 1,
    count: 0,
    description: "A basic array to collect stardust automatically.",
  },
  {
    name: "Nova Beacon ✨",
    purchaseCost: 100,
    rate: 5,
    count: 0,
    description: "Shines brightly to speed up stardust collection.",
  },
  {
    name: "Galaxy 🌌",
    purchaseCost: 1000,
    rate: 100,
    count: 0,
    description: "An entire galaxy at the palm of your hand.",
  },
  {
    name: "Nebula Engine 🌠",
    purchaseCost: 5000,
    rate: 500,
    count: 0,
    description: "A massive engine fueled by nebulae.",
  },
  {
    name: "Celestial Throne 👑",
    purchaseCost: 20000,
    rate: 2000,
    count: 0,
    description: "Rule the cosmos and gain stardust rapidly.",
  },
];

// =============================================================================
// UPDATE LOGIC
// =============================================================================

const updateDisplay = (): void => {
  counterDisplay.textContent = `${counter.toFixed(1)} stars (${
    growthRate.toFixed(1)
  } stars/sec)`;

  availableItems.forEach((item) => {
    if (item.button) {
      item.button.disabled = counter < item.purchaseCost;
      item.button.textContent = `Buy ${item.name} (${
        item.purchaseCost.toFixed(1)
      } stars) — Owned: ${item.count}\n${item.description}`;
      item.button.style.whiteSpace = "pre-wrap";
      item.button.style.textAlign = "center";
    }
  });
};

// =============================================================================
// DOM & PAGE SETUP
// =============================================================================

// Body styling
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.minHeight = "100vh";
document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
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
  { duration: 2000, iterations: Infinity },
);

// Counter & growth display
const counterDisplay = document.createElement("div");
counterDisplay.style.fontSize = "24px";
counterDisplay.style.textAlign = "center";
document.body.appendChild(counterDisplay);

const growthDisplay = document.createElement("div");
growthDisplay.style.fontSize = "18px";
growthDisplay.style.textAlign = "center";
growthDisplay.style.marginBottom = "12px";
document.body.appendChild(growthDisplay);

// Click button
const clickButton = document.createElement("button");
clickButton.style.border = "none";
clickButton.style.background = "transparent";
clickButton.style.padding = "0";
clickButton.style.marginBottom = "16px";
clickButton.style.cursor = "pointer";

const buttonImage = document.createElement("img");
buttonImage.src = "./assets/star_button.png";
buttonImage.alt = "Click to collect stardust";
buttonImage.style.width = "800px";
buttonImage.style.height = "200px";
buttonImage.style.objectFit = "contain";
buttonImage.style.transition = "transform 0.1s ease, filter 0.1s ease";

clickButton.appendChild(buttonImage);
document.body.appendChild(clickButton);

// Upgrade buttons container
const upgradeContainer = document.createElement("div");
upgradeContainer.style.display = "flex";
upgradeContainer.style.flexDirection = "column";
upgradeContainer.style.alignItems = "center";
document.body.appendChild(upgradeContainer);

// =============================================================================
// MUSIC
// =============================================================================

const bgMusic = new Audio("./assets/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

globalThis.addEventListener("load", () => {
  bgMusic.play().catch(() => {
    console.log("Autoplay blocked; music will start after first click.");
  });
});

document.body.addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
}, { once: true });

// =============================================================================
// EVENT LISTENERS
// =============================================================================

// Click button effects
clickButton.addEventListener(
  "mouseover",
  () => buttonImage.style.transform = "scale(1.1)",
);
clickButton.addEventListener(
  "mouseout",
  () => buttonImage.style.transform = "scale(1)",
);
clickButton.addEventListener(
  "mouseover",
  () => buttonImage.style.filter = "brightness(70%)",
);
clickButton.addEventListener(
  "mouseout",
  () => buttonImage.style.filter = "brightness(100%)",
);
clickButton.addEventListener("mousedown", () => {
  buttonImage.style.transform = "scale(0.95)";
  buttonImage.style.filter = "brightness(50%)";
});
clickButton.addEventListener("mouseup", () => {
  buttonImage.style.transform = "scale(1)";
  buttonImage.style.filter = "brightness(70%)";
});
clickButton.addEventListener("mouseleave", () => {
  buttonImage.style.transform = "scale(1)";
  buttonImage.style.filter = "brightness(100%)";
});

// Click logic
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Upgrade buttons
availableItems.forEach((item) => {
  const btn = document.createElement("button");
  btn.style.margin = "6px";
  btn.style.width = "420px";
  btn.style.minWidth = "420px";
  btn.style.padding = "10px 16px";
  btn.style.fontSize = "16px";
  btn.disabled = true;
  item.button = btn;
  upgradeContainer.appendChild(btn);

  btn.addEventListener("click", () => {
    if (counter >= item.purchaseCost) {
      counter -= item.purchaseCost;
      item.count++;
      growthRate += item.rate;
      item.purchaseCost = parseFloat((item.purchaseCost * 1.15).toFixed(2));
      updateDisplay();
    }
  });
});

// =============================================================================
// SHOOTING STAR EFFECT
// =============================================================================

const spawnShootingStar = (): void => {
  const star = document.createElement("div");
  star.textContent = "⭐";
  star.style.position = "fixed";
  star.style.left = `${Math.random() * globalThis.innerWidth}px`;
  star.style.top = `${Math.random() * 100}px`;
  star.style.fontSize = `${24 + Math.random() * 6}px`;
  star.style.opacity = "0.8";
  star.style.pointerEvents = "none";
  star.style.transition = "transform 1s linear, opacity 1s ease-out";

  document.body.appendChild(star);

  const endX = Math.random() * 200 - 100;
  const endY = globalThis.innerHeight + 50;

  requestAnimationFrame(() => {
    star.style.transform = `translate(${endX}px, ${endY}px) rotate(45deg)`;
    star.style.opacity = "0";
  });

  setTimeout(() => star.remove(), 1000);
};

// =============================================================================
// GAME LOOP
// =============================================================================

const gameLoop = (currentTime: number): void => {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  counter += growthRate * deltaTime;

  if (currentTime - lastSpawnCheck >= 2000) {
    lastSpawnCheck = currentTime;

    let starsToSpawn = Math.floor(growthRate);
    if (starsToSpawn > 80) starsToSpawn = 80;

    for (let i = 0; i < starsToSpawn; i++) {
      setTimeout(spawnShootingStar, i * 100);
    }
  }

  updateDisplay();
  requestAnimationFrame(gameLoop);
};

// =============================================================================
// INITIALIZATION
// =============================================================================

updateDisplay();
requestAnimationFrame(gameLoop);
