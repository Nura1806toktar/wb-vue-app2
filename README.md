
# WB Vue SPA App

This is a Single Page Application (SPA) built with **Vue 3**, **Vite**, and **Chart.js**.  
It visualizes and displays order, sale, income, and stock data from a Wildberries-style backend API.

## 🔧 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/) (via vue-chartjs)
- [Bootstrap](https://getbootstrap.com/) for basic styling
- RESTful API integration

## 📁 Project Structure

src/
├── api/ # API calls (Axios)
├── components/ # Reusable charts (OrdersChart, SalesChart, etc.)
├── pages/ # Main pages (OrdersPage.vue, SalesPage.vue, etc.)
├── router/ # Vue Router config
└── App.vue # Main layout and navigation



## 🚀 Features

- 📊 Graphs for Orders, Sales, Incomes, and Stocks
- 📅 Filter by date range
- 📦 Table view with pagination
- 🔄 Real-time data from REST API

## 📦 Setup & Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Nura1806toktar/wb-vue-app2.git
cd wb-vue-app2
Install dependencies:


npm install
Run the dev server:

bash

npm run dev
Open http://localhost:5173 in your browser.

🌐 API Configuration
All API calls go through src/api/index.js. Make sure your API base URL and key are set up correctly:

js

const API_BASE = 'http://your-server-ip:port/api';
const API_KEY = 'your-api-key';
🖼 Screenshots
(You can insert screenshots of your charts and tables here.)

🧑‍💻 Author
Made with ❤️ by @Nura1806toktar

This project is part of a WB analytics dashboard for internal use or demo purposes.




