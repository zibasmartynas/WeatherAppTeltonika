# Vue Weather App

A simple Weather App built with Vue 3 Composition API. The app fetches current weather data using the OpenWeatherMap API and allows users to add, remove, and search forecasts. Forecasts are stored in localStorage and automatically updated every 5 minutes.

Designed with Bulma.io and built with Vite.

## Features

Add weather forecasts by City name, ZIP code, or coordinates.

Paginated table showing 10 forecasts per page.

View details: temperature, humidity, wind speed, pressure, sunrise/sunset, and weather icon.

Search forecasts on the main page.

Remove forecasts from the list.

Automatic updates of forecasts every 5 minutes.

Notifications for success and error messages.

Local storage persistence (saved forecasts appear on page reload).

Sunrise and sunset shown in 24-hour format.

Responsive and minimal design using Bulma.


You can run the app locally to see it in action.

## Installation

Clone the repository

`git clone https://github.com/zibasmartynas/vue-weather-app.git`

`cd vue-weather-app`

Install dependencies

`npm install`


## Development

Start a development server with hot reload:

`npm run dev`

Open your browser at the URL shown in the terminal (usually http://localhost:5173).

## Build & Serve

Build the project

`npm run build`

This will generate a dist folder with production-ready files.

Serve using http-server

Install http-server globally if you don’t have it:

`npm install -g http-server`

Serve the dist folder:

`http-server dist`

Open your browser at the URL shown in the terminal (usually http://localhost:8080).

## Usage

Click "Add Forecast" to open the modal.

Enter a city name, ZIP code, or coordinates (e.g., Vilnius, LT-04322, 54.6872,25.2797) and click Search.

The forecast will appear in the table. If the table has multiple pages, it automatically navigates to the first page.

Use the search bar to filter forecasts.

Click the ✕ button to remove a forecast.

Notifications will appear for all actions (success or error).

## Dependencies

Vue 3

Axios

Bulma.io

Vite

http-server
 (for serving production build)
