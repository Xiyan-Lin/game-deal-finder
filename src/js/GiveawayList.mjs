import { escapeHtml, truncate } from "./utils.mjs";

function giveawayCard(giveaway) {
  const image = giveaway.thumbnail || giveaway.image || "/images/game-placeholder.svg";
  const link = giveaway.open_giveaway_url || giveaway.gamerpower_url || "https://www.gamerpower.com/";
  const worth = giveaway.worth && giveaway.worth !== "N/A" ? giveaway.worth : "Free";
  const platforms = giveaway.platforms || "Multiple platforms";
  const endDate = giveaway.end_date && giveaway.end_date !== "N/A"
    ? giveaway.end_date
    : "While available";

  return `
    <article class="giveaway-card">
      <img
        class="giveaway-card__image"
        src="${escapeHtml(image)}"
        alt="Giveaway artwork for ${escapeHtml(giveaway.title || "Free game")}" 
        loading="lazy"
      />
      <div class="giveaway-card__body">
        <p class="eyebrow">${escapeHtml(giveaway.type || "Giveaway")}</p>
        <h3>${escapeHtml(giveaway.title || "Free game giveaway")}</h3>
        <p class="giveaway-description">${escapeHtml(
          truncate(giveaway.description || "A current gaming giveaway from GamerPower.", 150),
        )}</p>
        <div class="giveaway-meta">
          <span><strong>Value:</strong> ${escapeHtml(worth)}</span>
          <span><strong>Platform:</strong> ${escapeHtml(platforms)}</span>
          <span><strong>Ends:</strong> ${escapeHtml(endDate)}</span>
        </div>
        <a
          class="button-link"
          href="${escapeHtml(link)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Giveaway
        </a>
      </div>
    </article>`;
}

export default class GiveawayList {
  constructor(container) {
    this.container = container;
  }

  render(giveaways, limit = 6) {
    const list = Array.isArray(giveaways) ? giveaways.slice(0, limit) : [];
    this.container.innerHTML = list.map(giveawayCard).join("");
  }
}
