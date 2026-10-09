const STORAGE_KEY = "game-deal-finder-favorites";

function normalizeFavorite(game = {}) {
  const id = game.id ?? game.gameID;
  const name = game.name ?? game.external ?? "Unknown Game";
  const image = game.image ?? game.thumb ?? "";
  const cheapest = game.cheapest ?? null;

  return {
    id: String(id ?? ""),
    name,
    image,
    cheapest,
    steamAppID: game.steamAppID ?? null,
    source: "cheapshark",
  };
}

export function getFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(value)) return [];
    return value
      .map(normalizeFavorite)
      .filter((game) => game.id && game.name);
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new CustomEvent("favoritechange", { detail: favorites }));
}

export function isFavorite(id) {
  return getFavorites().some((game) => String(game.id) === String(id));
}

export function toggleFavorite(game) {
  const normalized = normalizeFavorite(game);
  if (!normalized.id) return false;

  const favorites = getFavorites();
  const index = favorites.findIndex(
    (item) => String(item.id) === String(normalized.id),
  );

  if (index >= 0) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
    return false;
  }

  favorites.push(normalized);
  saveFavorites(favorites);
  return true;
}

export function updateFavoriteCount(element) {
  if (!element) return;
  element.textContent = String(getFavorites().length);
}
