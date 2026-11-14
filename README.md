# B2B Catalog & Order Builder

A checkout-free e-commerce catalog where users browse products, build a cart, and print, copy, or export their order summary to Excel.

## ✨ Features
- **Product Catalog:** Browse items and manage quantities without an online payment gateway.
- **Cart Summary:** View a clean breakdown of all selected products and totals.
- **One-Click Export:** 
  - 🖨️ **Print** formatted order summary
  - 📋 **Copy** cart details to clipboard
  - 📊 **Export to Excel** (`.xlsx` / `.csv`) for procurement or RFQ

## 🛠️ Tech Stack
- **Backend:** ASP.NET Core Web API, SQLite
- **Frontend:** React, TypeScript, Material UI (MUI)

## 🏗️ Project Structure
- `/API` – ASP.NET Core Web API & SQLite database
- `/client` – React + TypeScript + MUI web application

## 🚀 Getting Started

### Prerequisites
- [.NET SDK](https://microsoft.com)
- [Node.js](https://nodejs.org)

### Run Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com
   cd b2b
   ```

2. **Start the Backend (API)**
   ```bash
   cd API
   dotnet run
   ```

3. **Start the Frontend (Client)**
   ```bash
   cd client
   npm install
   npm run dev
   ```
