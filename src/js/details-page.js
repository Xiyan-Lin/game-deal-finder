import CheapSharkService from "./CheapSharkService.mjs";
import { renderDeals, renderGameDetails } from "./GameDetails.mjs";
import { updateFavoriteCount } from "./Favorites.mjs";
import { getParam, renderEmpty, renderError, setStatus } from "./utils.mjs";

const cheapShark = new CheapSharkService();

const statusElement = document.querySelector("#details-status");
const detailsElement = document.querySelector("#game-details");
const dealsSection = document.querySelector("#deals-section");
const dealStatus = document.querySelector("#deal-status");
const dealList = document.querySelector("#deal-list");
const storeFilter = document.querySelector("#store-filter");
const dealSort = document.querySelector("#deal-sort");
const favoriteCount = document.querySelector("#favorite-count");

let allDeals = [];
let storeMap = new Map();

function sortedFilteredDeals() {
  let deals = [...allDeals];

  if (storeFilter.value !== "all") {
    deals = deals.filter(
      (deal) => String(deal.storeID) === storeFilter.value,
    );
  }

  if (dealSort.value === "discount-desc") {
    deals.sort(
      (a, b) => Number(b.savings || 0) - Number(a.savings || 0),
    );
  } else {
    deals.sort(
      (a, b) => Number(a.price || Infinity) - Number(b.price || Infinity),
    );
  }

  return deals;
}

function refreshDealTable() {
  const deals = sortedFilteredDeals();

  if (!deals.length) {
    renderEmpty(dealList, "No deals match the selected store.");
    return;
  }

  renderDeals(dealList, deals, storeMap, cheapShark);
}

function populateStoreFilter(deals, stores) {
  const storeIds = [...new Set(deals.map((deal) => String(deal.storeID)))];
  storeFilter.innerHTML = '<option value="all">All stores</option>';

  storeIds
    .sort((a, b) => (stores.get(a) || a).localeCompare(stores.get(b) || b))
    .forEach((storeId) => {
      const option = document.createElement("option");
      option.value = storeId;
      option.textContent = stores.get(storeId) || `Store ${storeId}`;
      storeFilter.append(option);
    });
}

async function init() {
  updateFavoriteCount(favoriteCount);
  window.addEventListener("favoritechange", () =>
    updateFavoriteCount(favoriteCount),
  );

  const id = getParam("id");
  if (!id) {
    renderError(detailsElement, "No game ID was provided.");
    return;
  }

  setStatus(statusElement, "Loading game details…", "loading");

  try {
    const [game, stores] = await Promise.all([
      cheapShark.getGameById(id),
      cheapShark.getStores(),
    ]);

    setStatus(statusElement, "");
    document.title = `${game.name} | Game Deal Finder`;

    renderGameDetails(detailsElement, game, favoriteCount);

    allDeals = game.deals;
    storeMap = stores;

    dealsSection.classList.remove("is-hidden");
    setStatus(dealStatus, "");

    if (!allDeals.length) {
      renderEmpty(dealList, "No PC deals were found for this title.");
      return;
    }

    populateStoreFilter(allDeals, storeMap);
    refreshDealTable();
  } catch (error) {
    console.error(error);
    setStatus(statusElement, "");
    setStatus(dealStatus, "");
    renderError(
      detailsElement,
      error.message || "Unable to load game details.",
    );
  }
}

storeFilter.addEventListener("change", refreshDealTable);
dealSort.addEventListener("change", refreshDealTable);

init();
