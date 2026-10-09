import GameList from "./GameList.mjs";
import { getFavorites, updateFavoriteCount } from "./Favorites.mjs";
import { renderEmpty, setStatus } from "./utils.mjs";

const container = document.querySelector("#favorite-results");
const status = document.querySelector("#favorites-status");
const favoriteCount = document.querySelector("#favorite-count");
const gameList = new GameList(container, favoriteCount);

function renderFavorites() {
  const favorites = getFavorites();
  updateFavoriteCount(favoriteCount);

  if (!favorites.length) {
    setStatus(status, "");
    renderEmpty(container, "You do not have any favorite games yet. Search for a game and save it to your favorites.");
    return;
  }

  setStatus(status, `${favorites.length} saved game${favorites.length === 1 ? "" : "s"}.`);
  gameList.render(favorites);
}

window.addEventListener("favoritechange", renderFavorites);
renderFavorites();
