import { renderCard } from "./card.js";

export function initModal(gamesData) {
  const searchPool = buildSearchPool(gamesData);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal__backdrop" data-action="close-search"></div>
    <div class="modal__panel" role="document">
      <header class="modal__header">
        <h2 class="modal__title" id="modal-title">Search</h2>
        <button type="button" class="modal__close" data-action="close-search" aria-label="Close">
          <img src="images/close.svg" alt="" aria-hidden="true" width="24" height="24" />
        </button>
      </header>

      <p class="modal__hint">Enter the game titel in the search below</p>
      <label class="modal__label" for="modal-search">helper label</label>

      <div class="modal__input-wrap">
        <img class="modal__input-icon" src="images/search.svg" alt="" aria-hidden="true" width="16" height="16" />
        <input
          id="modal-search"
          type="text"
          class="modal__input"
          placeholder="Search"
          autocomplete="off"
        />
        <button type="button" class="modal__clear" data-action="clear-search" aria-label="Clear">
          <img src="images/close.svg" alt="" aria-hidden="true" width="16" height="16" />
        </button>
      </div>

      <h3 class="modal__results-title">Top games</h3>
      <ul class="modal__grid" data-results>
        ${searchPool.map(renderCard).join("")}
      </ul>
      <p class="modal__empty" data-empty hidden>No games match your search.</p>
    </div>
  `;
  document.body.appendChild(modal);

  const searchInput = modal.querySelector("#modal-search");
  const resultsGrid = modal.querySelector("[data-results]");
  const emptyMessage = modal.querySelector("[data-empty]");
  const clearButton = modal.querySelector('[data-action="clear-search"]');

  let triggerElement = null;

  function openModal() {
    triggerElement = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput.focus(), 0);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    searchInput.value = "";
    filterResults("");
    if (triggerElement && typeof triggerElement.focus === "function") {
      triggerElement.focus();
    }
  }

  function filterResults(query) {
    const normalizedQuery = query.trim().toLowerCase();
    let visibleCount = 0;
    resultsGrid.querySelectorAll(".card").forEach((cardElement) => {
      const cardTitle = (cardElement.dataset.title || "").toLowerCase();
      const isMatch = !normalizedQuery || cardTitle.includes(normalizedQuery);
      cardElement.classList.toggle("card--hidden", !isMatch);
      if (isMatch) visibleCount += 1;
    });
    emptyMessage.hidden = visibleCount !== 0;
  }

  document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest('[data-action="open-search"]');
    if (openTrigger) {
      event.preventDefault();
      openModal();
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest('[data-action="close-search"]')) closeModal();
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterResults("");
    searchInput.focus();
  });

  searchInput.addEventListener("input", () => filterResults(searchInput.value));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function buildSearchPool(gamesData) {
  if (Array.isArray(gamesData.all)) {
    return gamesData.all.slice();
  }
  return [];
}
