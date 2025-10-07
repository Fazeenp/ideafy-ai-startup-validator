# Ideafy – Startup Analysis Platform

**Ideafy** Ideafy is a web platform that helps entrepreneurs and investors quickly understand the potential of a startup idea. By entering basic details about the business, users get a complete analysis covering market opportunity, competition, financial outlook, product validation, and actionable recommendations.

The platform presents all insights through clear visuals and interactive charts, making it easy to spot strengths, weaknesses, and growth opportunities. Ideafy turns complex startup data into straightforward, practical advice that founders can use to refine their ideas and make smarter decisions.
## Live Demo

 [Try Ideafy Live](https://ideafy-ai-startup-validator.onrender.com/)  
 
 <img width="1899" height="886" alt="image" src="https://github.com/user-attachments/assets/6afdbb86-cc85-4420-aee9-b082596b2b02" />


## Workflow

1. Visit the Ideafy web application.  
2. Fill out the startup idea form with the following details:  
   - Name, Industry, Description  
   - Target Market, Problem Solved, Unique Value  
   - Business Model, Funding, Timeline, Experience  
3. Submit the form for analysis.  
4. View **Executive Overview** with key metrics and highlights.  
5. See **Financial Projections** including revenue forecasts and KPIs.  
6. Check **Market & Competition Analysis** with competitor data and charts.  
7. Explore **Product Validation** metrics and user feedback trends.  
8. Receive **Strategic Recommendations** and actionable next steps.  
9. Download or export the full report.

## Features

* **Executive Overview:** Provides a high-level summary of the startup, key metrics, and highlights.
* **Financials:** Displays financial projections, key performance indicators (KPIs), and insights for decision-making.
* **Market & Competition:** Analyzes market landscape, competitor breakdown, and competitive advantages using visual charts.
* **Product Validation:** Offers validation metrics, trends on feature interest, and user feedback insights.
* **Recommendations:** Suggests strategic actions, identifies potential risks, and outlines a final execution roadmap.
* **Interactive Charts:** Uses modern visualization libraries to represent data dynamically (Line, Pie, Radar charts).
<img width="1894" height="968" alt="image" src="https://github.com/user-attachments/assets/a30fc807-6d79-43f9-b3bb-022b23727ff7" />



## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Frontend   | React, Tailwind CSS, Recharts                          |
| Backend    | Node.js, Express                                       |
| Database   | MongoDB (or any structured data source)                |
| Deployment | Vercel / Netlify (Frontend), Render / Heroku (Backend) |



## Project Structure

* `frontend/components` – React components including ExecutiveOverview, Financials, MarketCompetition, ProductValidation, Recommendations.
* `frontend/charts` – Chart components powered by Recharts (LineChart, PieChart, RadarChart).
* `backend/routes` – Handles business logic and data delivery.
* `backend/controllers` – Contains core operations and computations for startup analysis.


## Benefits

* Provides a centralized platform for evaluating startup feasibility.
* Offers visual insights and metrics to support decision-making.
* Enables structured planning for investors, founders, and stakeholders.
* Fully extendable to integrate real startup datasets.


## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/Fazeenp/ideafy-ai-startup-validator
cd ideafy ideafy-ai-startup-validator
```

2. **Install frontend dependencies:**

```bash
cd frontend
npm install
npm run dev
```

3. **Install backend dependencies:**

```bash
cd ../backend
npm install
npm node index.js
```

4. Open `http://localhost:5173` in a browser to access the application.

---

## License

MIT License © 2025 Fazeen Patel.
