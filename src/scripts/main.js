import "../styles/main.scss";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";

const root = document.getElementById("app");

root.innerHTML = `
  ${renderHeader()}
  <main class="page">
    ${renderHero()}
  </main>
`;
