export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function setStatus(element, message, type = "text") {
  if (!element) return;

  if (type === "loading") {
    element.innerHTML = `<span class="loading"><span class="spinner" aria-hidden="true"></span>${escapeHtml(message)}</span>`;
    return;
  }

  element.textContent = message;
}

export function renderError(element, message) {
  if (!element) return;
  element.innerHTML = `<div class="error-state">${escapeHtml(message)}</div>`;
}

export function renderEmpty(element, message) {
  if (!element) return;
  element.innerHTML = `<div class="empty-state">${escapeHtml(message)}</div>`;
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function formatDate(value) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function formatMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(number);
}

export function normalizeTitle(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function truncate(value = "", maxLength = 240) {
  const text = String(value).trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
