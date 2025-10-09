import "./style.css";

// 👇 State
let counter: number = 0;

// Growth rate (1 unit per second)
const growthRate = 1;

// Keep track of the last timestamp
let lastTime = performance.now();

// Add this to control overall page layout
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.minHeight = "100vh";
document.body.style.fontFamily = "Arial, sans-serif";

// Create display div
const counterDisplay = document.createElement("div");
counterDisplay.style.fontSize = "24px";
counterDisplay.style.textAlign = "center";

counterDisplay.textContent = `${counter.toFixed(2)} stars`;
document.body.appendChild(counterDisplay);

// Create the button
const button = document.createElement("button");
button.innerHTML = `⭐️ Click for more stars!`;
button.style.padding = "12px 24px";
button.style.fontSize = "16px";
document.body.appendChild(button);

// Update counter on click
button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter.toFixed(2)} stars`;
});

// 👇 Continuous growth using requestAnimationFrame
function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms → seconds
  lastTime = currentTime;

  // Increase counter based on time passed
  counter += growthRate * deltaTime;

  // Update display
  counterDisplay.textContent = `${counter.toFixed(2)} stars`;

  // Request next frame
  requestAnimationFrame(update);
}

// Start animation loop
requestAnimationFrame(update);
