export function renderHeader() {
  return `
    <header class="header">
      <div class="container header__inner">
        <a href="#" class="header__logo">Logo</a>
        <button
          type="button"
          class="header__search-btn"
          data-action="open-search"
          aria-label="Open search"
        >
          <img src="images/search.svg" alt="" aria-hidden="true" width="24" height="24" />
        </button>
      </div>
    </header>
  `;
}
