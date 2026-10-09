# Game Deal Finder

Game Deal Finder is a vanilla JavaScript web application for WDD 330. It uses CheapShark for PC game search, current deals, store comparison, and historical pricing. It uses GamerPower for current free-game giveaways.

## Features

- Search PC games by title
- View the cheapest known current price for search results
- Open a game deal-details page
- Compare current PC game deals from multiple stores
- Filter deals by store
- Sort deals by price or discount
- Save favorite games with localStorage
- View current free-game giveaways from GamerPower
- Loading states, error messages, responsive layout, and CSS animation

## APIs

1. CheapShark API - game search, game lookup, PC prices, deals, and store information
2. GamerPower API - active free games and gaming giveaways

Neither API requires an API key for this project.

## Setup

1. Run `npm install`.
2. Run `npm run start`.
3. Search for a game and test the View Deals page.
4. Test favorites and the GamerPower giveaway section.
5. Before deployment, run `npm run lint`, `npm run build`, and `npm run preview`.

## Deployment

This project is configured as a Vite multi-page app. On Render, create a Static Site with:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

No API environment variables are currently required.

## API Change Note

The original proposal planned to use RAWG with CheapShark. RAWG was replaced because account registration and Steam login returned server-side errors, so I could not obtain an API key. The final project still uses two third-party APIs: CheapShark for game search and price comparison, and GamerPower for current free games and giveaways.

## Attribution

- Deal data: [CheapShark](https://www.cheapshark.com/)
- Giveaway data: [GamerPower](https://www.gamerpower.com/)
