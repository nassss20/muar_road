# PaveWise - Road Asset Management & GIS Portal 🗺️🛣️

The **PaveWise Portal** is a modern, comprehensive web-based application designed to assist agencies in managing road infrastructure, assessing life cycle costs (LCCA), and visualizing assets spatially. The system integrates external ArcGIS Dashboards with native data tables and authentication mechanisms to provide a secure, all-in-one management experience.

## ✨ Key Features

- 🗺️ **ArcGIS Dashboard Integration**: Embeds a fully functional Esri ArcGIS dashboard, allowing spatial filtering, road section selection, and budget visualization directly within the portal.
- 📋 **Road Project Registry**: A dynamic, filterable table for viewing, adding, editing, and deleting road projects. Records include start/end kilometers, mix categories, distress types, and cost estimations.
- 💰 **Life Cycle Cost Analysis (LCCA)**: A dedicated module that presents pavement alternatives ranked by NPV (Net Present Value), initial cost, and maintenance cost ratio.
- 🔐 **Secure Authentication System**: A modern login system utilizing Supabase Auth, protecting all database interactions and dashboard pages from unauthorized access.
- 🌗 **Night / Light Mode Toggle**: A built-in theme switcher that allows users to seamlessly switch between a modern dark mode and a clean light mode, persisting their preference.
- 📱 **Responsive Design**: Built with Tailwind CSS to ensure a seamless experience across desktop and mobile devices.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Authentication)
- **Deployment**: [Vercel](https://vercel.com/) (via `vercel.json`)

## 📦 Project Structure

```text
├── public/                 # Static assets (favicon, logos, etc.)
├── src/                    # Source code
│   ├── assets/             # Images and styles
│   ├── components/         # Reusable UI components (ThemeSwitcher, etc.)
│   ├── context/            # React Contexts (AuthContext for Supabase)
│   ├── lib/                # Library configurations (Supabase client)
│   ├── pages/              # Page components (Login, Dashboard)
│   ├── App.jsx             # Main application routing and layout
│   ├── index.css           # Global Tailwind styles
│   └── main.jsx            # Application entry point
├── supabase_schema.sql     # Database schema and RLS policies
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/nassss20/pavewise-portal.git
cd pavewise-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` or `.env.local` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Execute the `supabase_schema.sql` file in your Supabase SQL Editor to set up the `road_projects` and `lcca_results` tables, along with Row Level Security (RLS) policies.

### 5. Run the development server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

## 🗄️ Database Schema

The application utilizes the following primary tables in Supabase:
- **`auth.users`**: Managed by Supabase Auth for agency credentials.
- **`road_projects`**: Stores all asset records (road name, route number, km range, pavement alternatives, costs, distress analysis).
- **`lcca_results`**: Stores computed cost analyses and rankings for various pavement alternatives (e.g., CRMA, SFM, CMA, LATEX).

---
*Developed for Muar Road GIS Asset Management.*
