const BASE_URL = "https://www.gamerpower.com/api";

export default class GamerPowerService {
  async request(path, params = {}) {
    const url = new URL(`${BASE_URL}${path}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url);

    // GamerPower uses 201 when there are no active giveaways.
    if (response.status === 201) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`GamerPower request failed (${response.status}).`);
    }

    return response.json();
  }

  async getGiveaways({ platform = "", type = "", sortBy = "date" } = {}) {
    const data = await this.request("/giveaways", {
      platform,
      type,
      "sort-by": sortBy,
    });

    return Array.isArray(data) ? data : [];
  }

  async getGiveaway(id) {
    return this.request("/giveaway", { id });
  }
}
