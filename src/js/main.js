import GamerPowerService from "./GamerPowerService.mjs";
import CheapSharkService from "./CheapSharkService.mjs";
import GameList from "./GameList.mjs";
import GiveawayList from "./GiveawayList.mjs";
import SearchController from "./Search.mjs";
import { updateFavoriteCount } from "./Favorites.mjs";
import {
  escapeHtml,
  formatMoney,
  renderEmpty,
  renderError,
  setStatus,
} from "./utils.mjs";

const gamerPower = new GamerPowerService();
const cheapShark = new CheapSharkService();

const form = document.querySelector("#game-search-form");
const input = document.querySelector("#game-search");
const sortSelect = document.querySelector("#game-sort");
const resultsTitle = document.querySelector("#results-title");
const resultsElement = document.querySelector("#game-results");
const statusElement = document.querySelector("#status");
const featuredElement = document.querySelector("#featured-deals");
const featuredStatus = document.querySelector("#featured-status");
const giveawayElement = document.querySelector("#giveaway-results");
const giveawayStatus = document.querySelector("#giveaway-status");
const favoriteCount = document.querySelector("#favorite-count");

const gameList = new GameList(resultsElement, favoriteCount);
const giveawayList = new GiveawayList(giveawayElement);
let currentGames = [];

function sortGames(games, sortValue) {
  const copy = [...games];

  if (sortValue === "price-asc") {
    return copy.sort(
      (a, b) => Number(a.cheapest || Infinity) - Number(b.cheapest || Infinity),
    );
  }

  if (sortValue === "name-asc") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }

  return copy;
}

async function searchGames(query) {
  resultsTitle.textContent = `Search Results: ${query}`;
  resultsElement.innerHTML = "";
  setStatus(statusElement, `Searching for “${query}”…`, "loading");

  try {
    currentGames = await cheapShark.findGamesByTitle(query, 12);

    if (currentGames.length === 0) {
      setStatus(statusElement, "");
      renderEmpty(resultsElement, "No games were found. Try a different title.");
      return;
    }

    setStatus(
      statusElement,
      `${currentGames.length} game${currentGames.length === 1 ? "" : "s"} found.`,
    );
    gameList.render(sortGames(currentGames, sortSelect.value));
  } catch (error) {
    setStatus(statusElement, "");
    renderError(resultsElement, error.message || "Unable to load game results.");
  }
}

function renderFeaturedDeals(deals) {
  featuredElement.innerHTML = deals
    .map((deal) => {
      const savings = Math.max(0, Math.round(Number(deal.savings) || 0));
      const image = deal.thumb || "/images/game-placeholder.svg";
      return `
        <article class="deal-card">
          <img class="deal-card__image" src="${escapeHtml(image)}" alt="Deal artwork for ${escapeHtml(deal.title)}" loading="lazy" />
          <div class="deal-card__body">
            <h3>${escapeHtml(deal.title)}</h3>
            <div class="price-row">
              <span class="deal-price">${escapeHtml(formatMoney(deal.salePrice))}</span>
              <span class="old-price">${escapeHtml(formatMoney(deal.normalPrice))}</span>
              <span class="discount-pill">${escapeHtml(savings)}% OFF</span>
            </div>
            <a class="button-link" href="${escapeHtml(
              cheapShark.getDealUrl(deal.dealID),
            )}" target="_blank" rel="noopener noreferrer">View Deal</a>
          </div>
        </article>`;
    })
    .join("");
}

async function loadFeaturedDeals() {
  setStatus(featuredStatus, "Loading current deals…", "loading");

  try {
    const deals = await cheapShark.getFeaturedDeals(8);
    setStatus(featuredStatus, "");

    if (!deals.length) {
      renderEmpty(featuredElement, "No featured deals are available right now.");
      return;
    }

    renderFeaturedDeals(deals);
  } catch (error) {
    setStatus(featuredStatus, "");
    renderError(featuredElement, error.message || "Unable to load current deals.");
  }
}

async function loadGiveaways() {
  setStatus(giveawayStatus, "Loading free games and giveaways…", "loading");

  try {
    const giveaways = await gamerPower.getGiveaways({
      type: "game",
      sortBy: "date",
    });
    setStatus(giveawayStatus, "");

    if (!giveaways.length) {
      renderEmpty(giveawayElement, "No active full-game giveaways are available right now.");
      return;
    }

    giveawayList.render(giveaways, 6);
  } catch (error) {
    setStatus(giveawayStatus, "");
    renderError(
      giveawayElement,
      error.message || "Unable to load GamerPower giveaways.",
    );
  }
}

function init() {
  updateFavoriteCount(favoriteCount);
  window.addEventListener("favoritechange", () =>
    updateFavoriteCount(favoriteCount),
  );

  const searchController = new SearchController({
    form,
    input,
    sortSelect,
    onSearch: searchGames,
    onSort: (sortValue) => gameList.render(sortGames(currentGames, sortValue)),
  });
  searchController.init();

  const query = new URLSearchParams(window.location.search).get("q");
  if (query) {
    input.value = query;
    searchGames(query);
  } else {
    setStatus(statusElement, "Search for a game title to begin.");
  }

  loadFeaturedDeals();
  loadGiveaways();
}

init();
