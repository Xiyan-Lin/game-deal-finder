const BASE_URL = "https://www.cheapshark.com/api/1.0";

export default class CheapSharkService {
  constructor() {
    this.storeCache = null;
  }

  async request(path, params = {}) {
    const url = new URL(`${BASE_URL}${path}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`CheapShark request failed (${response.status}).`);
    }

    return response.json();
  }

  async getFeaturedDeals(limit = 8) {
    const data = await this.request("/deals", {
      pageSize: String(limit),
      sortBy: "DealRating",
      onSale: "1",
    });

    return Array.isArray(data) ? data : [];
  }

  async findGamesByTitle(title, limit = 10) {
    const query = String(title ?? "").trim();
    if (!query) return [];

    const data = await this.request("/games", {
      title: query,
      limit: String(limit),
    });

    if (!Array.isArray(data)) return [];

    return data.map((game) => ({
      id: String(game.gameID),
      name: game.external || "Unknown Game",
      image: game.thumb || "",
      steamAppID: game.steamAppID || null,
      cheapest: game.cheapest || null,
      cheapestDealID: game.cheapestDealID || null,
      source: "cheapshark",
    }));
  }

  async getStores() {
    if (this.storeCache) return this.storeCache;

    const data = await this.request("/stores");
    const map = new Map();

    if (Array.isArray(data)) {
      data.forEach((store) => {
        if (store.isActive === 1 || store.isActive === "1") {
          map.set(String(store.storeID), store.storeName);
        }
      });
    }

    this.storeCache = map;
    return map;
  }

  async getGameById(id) {
    const gameId = String(id ?? "").trim();
    if (!gameId) {
      throw new Error("No game ID was provided.");
    }

    const data = await this.request("/games", { id: gameId });

    if (!data || !data.info) {
      throw new Error("Game details were not found.");
    }

    const deals = Array.isArray(data.deals) ? data.deals : [];
    const dealPrices = deals
      .map((deal) => Number(deal.price))
      .filter((price) => Number.isFinite(price));

    return {
      id: gameId,
      name: data.info.title || "Unknown Game",
      image: data.info.thumb || "",
      steamAppID: data.info.steamAppID || null,
      cheapest: dealPrices.length ? String(Math.min(...dealPrices)) : null,
      cheapestPriceEver: data.cheapestPriceEver || null,
      deals,
      source: "cheapshark",
    };
  }

  getDealUrl(dealId) {
    return `https://www.cheapshark.com/redirect?dealID=${encodeURIComponent(
      dealId,
    )}`;
  }
}
