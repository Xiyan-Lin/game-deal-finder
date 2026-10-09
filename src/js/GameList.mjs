import { escapeHtml, formatMoney } from "./utils.mjs";
import {
  isFavorite,
  toggleFavorite,
  updateFavoriteCount,
} from "./Favorites.mjs";

function cardTemplate(game) {
  const image = game.image || "/images/game-placeholder.svg";
  const favorite = isFavorite(game.id);
  const price = game.cheapest ? formatMoney(game.cheapest) : "See deals";

  return `
    <article class="game-card">
      <img
        class="game-card__image"
        src="${escapeHtml(image)}"
        alt="Image for ${escapeHtml(game.name)}"
        loading="lazy"
      />

      <div class="game-card__body">
        <h3>${escapeHtml(game.name)}</h3>

        <div class="meta-row">
          <span>From</span>
          <strong>${escapeHtml(price)}</strong>
        </div>

        <div class="card-actions">
          <a
            class="button-link"
            href="/details/?id=${encodeURIComponent(game.id)}"
          >
            View Deals
          </a>
          <button
            class="favorite-button"
            type="button"
            data-favorite-id="${escapeHtml(game.id)}"
            aria-pressed="${favorite}"
          >
            ${favorite ? "♥ Saved" : "♡ Favorite"}
          </button>
        </div>
      </div>
    </article>
  `;
}

export default class GameList {
  constructor(container, favoriteCountElement) {
    this.container = container;
    this.favoriteCountElement = favoriteCountElement;
    this.games = [];
    this.attachEvents();
  }

  attachEvents() {
    this.container.addEventListener("click", (event) => {
      const button = event.target.closest("[data-favorite-id]");
      if (!button) return;

      const game = this.games.find(
        (item) => String(item.id) === String(button.dataset.favoriteId),
      );
      if (!game) return;

      const nowFavorite = toggleFavorite(game);
      button.setAttribute("aria-pressed", String(nowFavorite));
      button.textContent = nowFavorite ? "♥ Saved" : "♡ Favorite";
      updateFavoriteCount(this.favoriteCountElement);
    });
  }

  render(games) {
    this.games = Array.isArray(games) ? games : [];
    this.container.innerHTML = this.games.map(cardTemplate).join("");
  }
}
