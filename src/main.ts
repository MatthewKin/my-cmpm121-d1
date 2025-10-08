import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.createElement("button");
button.textContent = "Talk to The Website";
button.style.padding = "12px 24px";
button.style.fontSize = "16px";
button.style.margin = "20px";
button.addEventListener("click", () => {
  alert("HELLO USER! :DDD");
});

document.body.appendChild(button);
