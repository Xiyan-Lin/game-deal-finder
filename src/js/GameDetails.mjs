import { escapeHtml, formatMoney } from "./utils.mjs";
import { isFavorite, toggleFavorite, updateFavoriteCount } from "./Favorites.mjs";

function currentBestPrice(deals = []) {
  const prices = deals
    .map((deal) => Number(deal.price))
    .filter((price) => Number.isFinite(price));
  return prices.length ? Math.min(...prices) : null;
}

export function renderGameDetails(container, game, favoriteCountElement) {
  const image = game.image || "/images/game-placeholder.svg";
  const favorite = isFavorite(game.id);
  const bestPrice = currentBestPrice(game.deals);
  const historicalLow = game.cheapestPriceEver?.price ?? null;

  container.innerHTML = `
    <div class="detail-layout">
      <img
        class="detail-image"
        src="${escapeHtml(image)}"
        alt="Cover image for ${escapeHtml(game.name)}"
      />
      <div class="detail-copy">
        <p class="eyebrow">Game deal details</p>
        <h1>${escapeHtml(game.name)}</h1>

        <div class="detail-stats">
          <div class="stat-card">
            <strong>${bestPrice !== null ? escapeHtml(formatMoney(bestPrice)) : "N/A"}</strong>
            <span>Best current price</span>
          </div>
          <div class="stat-card">
            <strong>${historicalLow !== null ? escapeHtml(formatMoney(historicalLow)) : "N/A"}</strong>
            <span>Historical low</span>
          </div>
          <div class="stat-card">
            <strong>${escapeHtml(game.deals.length)}</strong>
            <span>Available deals</span>
          </div>
        </div>

        <p class="detail-description">
          Compare current PC prices from multiple stores below. Prices are provided by CheapShark and may change.
        </p>

        <div class="card-actions">
          <button
            id="detail-favorite-button"
            class="favorite-button"
            type="button"
            aria-pressed="${favorite}"
          >
            ${favorite ? "♥ Saved to Favorites" : "♡ Save Favorite"}
          </button>
          ${
            game.steamAppID
              ? `<a class="button-link" href="https://store.steampowered.com/app/${encodeURIComponent(
                  game.steamAppID,
                )}" target="_blank" rel="noopener noreferrer">View on Steam</a>`
              : ""
          }
        </div>
      </div>
    </div>`;

  const favoriteButton = container.querySelector("#detail-favorite-button");
  favoriteButton?.addEventListener("click", () => {
    const nowFavorite = toggleFavorite(game);
    favoriteButton.setAttribute("aria-pressed", String(nowFavorite));
    favoriteButton.textContent = nowFavorite
      ? "♥ Saved to Favorites"
      : "♡ Save Favorite";
    updateFavoriteCount(favoriteCountElement);
  });
}

export function renderDeals(container, deals, stores, cheapSharkService) {
  container.innerHTML = `
    <table class="deal-table">
      <thead>
        <tr>
          <th scope="col">Store</th>
          <th scope="col">Sale Price</th>
          <th scope="col">Normal Price</th>
          <th scope="col">Discount</th>
          <th scope="col">Link</th>
        </tr>
      </thead>
      <tbody>
        ${deals
          .map((deal) => {
            const storeName =
              stores.get(String(deal.storeID)) || `Store ${deal.storeID}`;
            const savings = Math.max(
              0,
              Math.round(Number(deal.savings) || 0),
            );
            return `
              <tr>
                <td>${escapeHtml(storeName)}</td>
                <td class="deal-price">${escapeHtml(formatMoney(deal.price))}</td>
                <td class="old-price">${escapeHtml(formatMoney(deal.retailPrice))}</td>
                <td><span class="discount-pill">${escapeHtml(savings)}% OFF</span></td>
                <td><a class="button-link" href="${escapeHtml(
                  cheapSharkService.getDealUrl(deal.dealID),
                )}" target="_blank" rel="noopener noreferrer">View Deal</a></td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>`;
}
