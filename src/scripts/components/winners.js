export function renderWinners(winners = []) {
  const duplicatedTrack = [...winners, ...winners]
    .map(renderWinnerCard)
    .join("");

  return `
    <div class="winners">
      <div class="winners__viewport">
        <ul class="winners__track" aria-label="Recent winners">
          ${duplicatedTrack}
        </ul>
      </div>
    </div>
  `;
}

function renderWinnerCard(winner) {
  return `
    <li class="winner-card">
      <img class="winner-card__image" src="${winner.image}" alt="${winner.title}" />
      <div class="winner-card__body">
        <div class="winner-card__title">${winner.title}</div>
        <div class="winner-card__amount">$ ${winner.amount}</div>
        <div class="winner-card__user">${winner.user}</div>
      </div>
    </li>
  `;
}
