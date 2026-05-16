import { renderCard } from "./card.js";

const MODES = ["recent", "favourite"];
const TAB_LABELS = { recent: "Recent", favourite: "Favourite" };

export function renderSection({ id, title, showTabs, modes, mobileGrid }) {
  const headerContent = showTabs
    ? renderTabs()
    : `<h2 class="section__title">${title}</h2>`;

  const rowsMarkup = MODES.map((mode) =>
    renderRow(mode, modes[mode] || []),
  ).join("");

  const extraClass = mobileGrid ? " section--grid-mobile" : "";

  return `
    <section class="section section--mode-recent${extraClass}" data-section="${id}">
      <div class="section__head">
        <div class="section__head-left">${headerContent}</div>
        <div class="section__head-right">
          <button type="button" class="section__nav" data-nav="prev" aria-label="Scroll left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 6-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="section__nav" data-nav="next" aria-label="Scroll right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            class="section__show-all"
            data-action="toggle-expand"
            aria-expanded="false"
          >Show all</button>
        </div>
      </div>
      <div class="section__rows">
        ${rowsMarkup}
      </div>
    </section>
  `;
}

function renderTabs() {
  return `
    <ul class="tabs" role="tablist">
      ${MODES.map(
        (mode, index) => `
        <li>
          <button
            type="button"
            role="tab"
            class="tabs__btn ${index === 0 ? "is-active" : ""}"
            data-mode="${mode}"
            aria-selected="${index === 0}"
          >${TAB_LABELS[mode]}</button>
        </li>
      `,
      ).join("")}
    </ul>
  `;
}

function renderRow(mode, games) {
  return `
    <ul class="section__row" data-row="${mode}" role="tabpanel">
      ${games.map(renderCard).join("")}
    </ul>
  `;
}

export function initSections() {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    setupNav(section);
    setupShowAll(section);
  });

  setupGlobalTabs(sections);
}

function setupGlobalTabs(sections) {
  const tabButtons = document.querySelectorAll(".tabs__btn[data-mode]");
  if (!tabButtons.length) return;

  tabButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", () => {
      applyMode(sections, tabButton.dataset.mode);
    });
  });
}

function applyMode(sections, mode) {
  document.querySelectorAll(".tabs__btn[data-mode]").forEach((tabButton) => {
    const isActive = tabButton.dataset.mode === mode;
    tabButton.classList.toggle("is-active", isActive);
    tabButton.setAttribute("aria-selected", String(isActive));
  });

  sections.forEach((section) => {
    MODES.forEach((availableMode) => {
      section.classList.toggle(
        `section--mode-${availableMode}`,
        availableMode === mode,
      );
    });
  });
}

function setupShowAll(section) {
  const showAllButton = section.querySelector('[data-action="toggle-expand"]');
  if (!showAllButton) return;

  showAllButton.addEventListener("click", () => {
    const isExpanded = section.classList.toggle("section--expanded");
    showAllButton.setAttribute("aria-expanded", String(isExpanded));
    showAllButton.textContent = isExpanded ? "Collapse" : "Show all";
  });
}

function setupNav(section) {
  const prevButton = section.querySelector('[data-nav="prev"]');
  const nextButton = section.querySelector('[data-nav="next"]');
  if (!prevButton || !nextButton) return;

  const getVisibleRow = () => {
    const rows = section.querySelectorAll(".section__row");
    return Array.from(rows).find(
      (row) => getComputedStyle(row).display !== "none",
    );
  };

  const refreshNavState = () => {
    const visibleRow = getVisibleRow();
    if (!visibleRow) return;
    const isAtStart = visibleRow.scrollLeft <= 1;
    const isAtEnd =
      visibleRow.scrollLeft + visibleRow.clientWidth >=
      visibleRow.scrollWidth - 1;
    setDisabled(prevButton, isAtStart);
    setDisabled(nextButton, isAtEnd);
  };

  const scrollByStep = (direction) => {
    const visibleRow = getVisibleRow();
    if (!visibleRow) return;
    const firstCard = visibleRow.querySelector(".card");
    const cardStep = firstCard
      ? firstCard.getBoundingClientRect().width + 8
      : 200;
    visibleRow.scrollBy({
      left: direction * cardStep * 2,
      behavior: "smooth",
    });
  };

  prevButton.addEventListener("click", () => scrollByStep(-1));
  nextButton.addEventListener("click", () => scrollByStep(1));

  section.querySelectorAll(".section__row").forEach((row) => {
    row.addEventListener("scroll", refreshNavState, { passive: true });
  });
  window.addEventListener("resize", refreshNavState);

  const observer = new MutationObserver(() =>
    requestAnimationFrame(refreshNavState),
  );
  observer.observe(section, { attributes: true, attributeFilter: ["class"] });

  requestAnimationFrame(refreshNavState);
}

function setDisabled(button, isDisabled) {
  button.disabled = isDisabled;
  button.classList.toggle("is-disabled", isDisabled);
  button.setAttribute("aria-disabled", String(isDisabled));
}
