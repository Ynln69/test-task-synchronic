import "../styles/main.scss";
import gamesData from "../data/games.json";
import { renderHeader } from "./components/header.js";
import { renderHero } from "./components/hero.js";
import { renderWinners } from "./components/winners.js";
import { renderSection, initSections } from "./components/section.js";
import { initModal } from "./components/modal.js";

const gameById = Object.fromEntries(
  gamesData.games.map((game) => [game.id, game]),
);

const gamesByIds = (ids) => ids.map((id) => gameById[id]).filter(Boolean);

const sectionModes = (sectionKey) => {
  const config = gamesData.sections[sectionKey];
  return {
    recent: gamesByIds(config.recent),
    favourite: gamesByIds(config.favourite),
  };
};

const recentSection = sectionModes("first");
const topGamesSection = sectionModes("top");
const miniGamesSection = sectionModes("mini");

const root = document.getElementById("app");

root.innerHTML = `
  ${renderHeader()}
  <main class="page">
    ${renderHero()}
    <div class="container">
      ${renderWinners(gamesData.winners)}
      ${renderSection({
        id: "first",
        showTabs: true,
        modes: recentSection,
      })}
      ${renderSection({
        id: "top",
        title: "Top games",
        modes: topGamesSection,
        mobileGrid: true,
      })}
      ${renderSection({
        id: "mini",
        title: "Mini games",
        modes: miniGamesSection,
      })}
    </div>
  </main>
`;

initSections();

const modalGames = gamesData.modal
  .map((id, index) => {
    const game = gameById[id];
    return game ? { ...game, id: `${id}-${index}` } : null;
  })
  .filter(Boolean);

initModal({ all: modalGames });
