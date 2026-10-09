# WDD 330 Game Deal Finder Submission Guide

## API Change Note

The original proposal planned to use RAWG and CheapShark. RAWG was replaced because account registration and Steam login returned server-side errors, so an API key could not be obtained. The final project uses CheapShark for game search and price comparison and GamerPower for active free-game giveaways. The project still uses two external third-party APIs.

## W05 Report on Tasks

Completed tasks to report for Week 5:

1. Create Project Repository and Structure
   - Set up the Vite project, folders, ES modules, and multi-page structure.
2. Create Home Page Layout
   - Built the search page, header, navigation, current-deals area, and responsive game grid.
3. Create Game Search Form
   - Added a validated search form for game titles.
4. Connect CheapShark API for Search
   - Added CheapSharkService.mjs for game search and game lookup.
5. Display Game Search Results
   - Rendered CheapShark JSON data into reusable game cards.
6. Create Game Deal Detail View
   - Added a dynamic detail page with current prices, historical low, store filter, and deal sorting.

Suggested W05 Canvas response:

Task: Create project structure and responsive home page
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Task: Connect CheapShark API and create game search
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Task: Display game search results and game deal detail view
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Trello: https://trello.com/b/EWS3NTCO/gamedealfinder

## W06 Report on Tasks

Completed tasks to report for Week 6:

1. Connect GamerPower API
   - Added GamerPowerService.mjs to retrieve current free-game giveaways.
2. Display Free Games and Giveaways
   - Added giveaway cards with title, image, value, platform, end date, and external link.
3. Display and Compare CheapShark Deals
   - Added a price comparison table with sale price, normal price, discount, and deal links.
4. Add Store Filter and Deal Sorting
   - Users can filter by store and sort by lowest price or best discount.
5. Create Favorites Feature
   - Users can save and remove favorite games.
6. Save Favorites with LocalStorage
   - Favorites remain after the browser is refreshed.
7. Add Loading and Error Feedback
   - Added loading spinner, empty-state messages, and API error messages.
8. Add Responsive CSS and Animation
   - Added responsive layouts, hover transitions, card animation, and loading animation.

Suggested W06 Canvas response:

Task: Connect GamerPower API and display free-game giveaways
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Task: Add CheapShark price comparison, filtering, and sorting
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Task: Add favorites with localStorage and loading/error feedback
Source: [PASTE GITHUB REPOSITORY OR COMMIT URL]
Site: [PASTE LIVE SITE URL]

Trello: https://trello.com/b/EWS3NTCO/gamedealfinder

## Trello Board Update

Move these cards to Done after you push and test the project:
- Create Project Repository
- Create Home Page Layout
- Create Responsive Navigation
- Create Game Search Form
- Connect CheapShark API
- Display Game Search Results
- Create Game Detail View
- Display Game Deals
- Compare Game Prices
- Add Store Filter
- Add Price Sorting
- Add Discount Sorting
- Connect GamerPower API
- Display Free Games and Giveaways
- Create Favorites Feature
- Save Favorites with LocalStorage
- Create Favorites Page
- Add Loading and Error Messages
- Add CSS Animations
- Create Mobile Responsive Design
- Update README
- Replace RAWG API with GamerPower API

Remove or rename these old cards:
- Connect RAWG API -> remove
- Configure RAWG API Key for Deployment -> remove
- Test RAWG API Requests -> remove

Keep these in To Do / Backlog until final work is complete:
- Test CheapShark API Requests on deployed site
- Test GamerPower API Requests on deployed site
- Run ESLint and Fix Errors
- Test Production Build
- Improve Accessibility / final accessibility review
- Final Application Testing
- Deploy Final Project
- Verify GitHub and Live Site Links
- Create Final Project Video

## Before You Submit

1. Run `npm install`.
2. Run `npm run start` and test search, details, deals, filters, sorting, giveaways, and favorites.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Run `npm run preview` and test the production build.
6. Push the project to GitHub.
7. Deploy the `dist` output to Render.
8. Test both APIs on the deployed domain.
9. Replace placeholder GitHub and live-site URLs in your W05/W06 submission text.
