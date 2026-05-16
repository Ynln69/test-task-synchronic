export function renderCard(game) {
  return `
    <li class="card" data-title="${escapeAttribute(game.title)}">
      <div class="card__media">
        <img class="card__image" src="${game.image}" alt="${escapeAttribute(game.title)}" loading="lazy" />
        <div class="card__overlay">
          <button type="button" class="card__btn card__btn--play">Play</button>
          <button type="button" class="card__btn card__btn--demo">Demo</button>
        </div>
      </div>
      <div class="card__meta">
        <img class="card__icon" src="images/card-icon-play.png" alt="" aria-hidden="true" />
        <span class="card__provider">${escapeHtml(game.provider)}</span>
      </div>
    </li>
  `;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value = '') {
  return escapeHtml(value).replace(/"/g, '&quot;');
}
