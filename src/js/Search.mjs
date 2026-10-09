export default class SearchController {
  constructor({ form, input, sortSelect, onSearch, onSort }) {
    this.form = form;
    this.input = input;
    this.sortSelect = sortSelect;
    this.onSearch = onSearch;
    this.onSort = onSort;
  }

  init() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = this.input.value.trim();
      if (query.length < 2) return;
      this.onSearch(query);
    });

    this.sortSelect.addEventListener("change", () => {
      this.onSort(this.sortSelect.value);
    });
  }
}
