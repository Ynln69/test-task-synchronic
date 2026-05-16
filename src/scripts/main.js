import "../styles/main.scss";
import { renderHeader } from "./components/header.js";

const root = document.getElementById("app");

root.innerHTML = `
  ${renderHeader()}
  <main class="page"></main>
`;
