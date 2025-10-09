import "./style.css";

// 👇 State
let counter: number = 0;

// Automatically increase counter every second
setInterval(() => {
  counter++;
  counterDisplay.textContent = `${counter} paperclips`;
}, 1000);

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

counterDisplay.textContent = `${counter} stars`;
document.body.appendChild(counterDisplay);

// Create the button (same as before)
const button = document.createElement("button");
button.innerHTML = `⭐️ Click for more stars!`;
button.style.padding = "12px 24px";
button.style.fontSize = "16px";

// 👇 Update counter on click
button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} stars`;
});

document.body.appendChild(button);
