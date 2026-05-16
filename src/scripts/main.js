import "../styles/main.scss";
import gamesData from "../data/games.json";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderWinners } from "./components/winners.js";

const root = document.getElementById("app");

root.innerHTML = `
  ${renderHeader()}
  <main class="page">
    ${renderHero()}
    <div class="container">
      ${renderWinners(gamesData.winners)}
    </div>
  </main>
`;
