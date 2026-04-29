# Data Analyst Portfolio

A modern data analytics portfolio built with Next.js and Supabase, showcasing SQL expertise, data cleaning methodologies, and analytical insights using real-world datasets.

## 🎯 Project Overview

This portfolio demonstrates:
- **Data Cleaning**: Non-destructive cleaning using SELECT queries only
- **Data Analysis**: COVID-19 pandemic trends and housing market analysis
- **ETL Pipeline**: Integration of Excel data into Supabase PostgreSQL
- **Interactive Dashboards**: Real-time data visualization and query results
- **Best Practices**: Reproducible queries, data validation, and documentation

## 🚀 Features

### Nashville Housing Data Cleaning
- Date standardization and format normalization
- NULL value population using self-joins
- Address parsing and splitting
- Boolean value standardization (Y/N → Yes/No)
- Duplicate detection using window functions
- Outlier identification and anomaly detection

### COVID-19 Data Analysis
- Death rate calculations and trends
- Infection rate analysis by population
- Vaccination progress tracking
- Country comparisons and rankings
- Time-series trend analysis
- Multi-table JOIN operations

### Data Integration Pipeline
- Excel file import from multiple sources
- Data transformation and validation
- Supabase PostgreSQL integration
- REST API endpoints
- Real-time query execution

## 💻 Tech Stack

**Frontend:**
- Next.js 16 (React framework)
- TypeScript (Type safety)
- Tailwind CSS (Styling)
- Lucide React (Icons)

**Backend & Database:**
- Supabase (PostgreSQL)
- Supabase JS Client
- Next.js API Routes
- REST API

**Data Processing:**
- XLSX Library (Excel parsing)
- JavaScript/TypeScript
- SQL Queries

## 🏗️ Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── data/route.ts          # Data fetching API
│   │   └── query/route.ts         # Custom query API
│   ├── projects/
│   │   ├── housing-cleaning/      # Housing cleaning project page
│   │   ├── covid-analysis/        # COVID analysis project page
│   │   └── data-pipeline/         # Data pipeline documentation
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── DataCleaningDemo.tsx       # Data cleaning showcase component
│   └── CovidDashboard.tsx         # COVID analysis dashboard
├── lib/
│   └── supabase.ts                # Supabase client configuration
├── public/                        # Static assets
├── .env.local                     # Environment variables
├── schema.sql                     # Database schema
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

## 🔧 Setup Instructions

### 1. Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)
- Excel files with data

### 2. Installation

```bash
# Navigate to portfolio directory
cd portfolio

# Install dependencies
npm install
```

### 3. Environment Configuration

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-api-key
```

Get these values from Supabase:
1. Go to Supabase Dashboard
2. Project Settings → API
3. Copy the URL and anon key

### 4. Database Setup

1. Open Supabase SQL Editor
2. Copy the content from `schema.sql`
3. Execute all queries to create tables and indexes
4. (Optional) Import data from Excel files

### 5. Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## 📊 Database Schema

### Tables

**covid_deaths**
- Tracks COVID-19 cases and deaths by location and date
- 46 columns including calculated metrics
- ~56,000+ records

**covid_vaccinations**
- Vaccination progress and percentages
- 18 columns with vaccination metrics
- ~50,000+ records

**nashville_housing**
- Real estate transaction data
- 26 columns with property details
- 56,477 records

### Indexes
- Location + Date composite indexes for fast querying
- Individual column indexes on frequently filtered fields

## 🔍 Sample Queries

### Death Rate Analysis
```sql
SELECT location, date, total_cases, total_deaths,
       (total_deaths / total_cases) * 100 AS death_percent
FROM covid_deaths
WHERE location = 'India'
ORDER BY date DESC
LIMIT 10;
```

### Infection Rate by Population
```sql
SELECT location, 
       MAX(total_cases) AS total_cases,
       MAX(population) AS population,
       (MAX(total_cases) * 100.0 / MAX(population)) AS infection_rate
FROM covid_deaths
WHERE location = 'India'
GROUP BY location;
```

### Housing Price Analysis
```sql
SELECT 
  property_city,
  ROUND(AVG(sale_price), 2) AS avg_price,
  MAX(sale_price) AS max_price,
  MIN(sale_price) AS min_price,
  COUNT(*) AS transaction_count
FROM nashville_housing
WHERE sale_price > 0
GROUP BY property_city
ORDER BY avg_price DESC;
```

## 🌐 API Endpoints

### GET /api/data
Fetch data from any table

**Parameters:**
- `table`: Table name (covid_deaths, covid_vaccinations, nashville_housing)
- `type`: Query type (covid, housing)
- `location`: Location filter (for COVID data)
- `limit`: Record limit (default: 50)

**Example:**
```bash
GET /api/data?table=covid_deaths&type=covid&location=India&limit=10
```

### POST /api/query
Execute custom SELECT queries

**Body:**
```json
{
  "query": "SELECT * FROM covid_deaths WHERE location = 'India' LIMIT 10"
}
```

## 📈 Key Analytics

- **Death Rate**: (Total Deaths / Total Cases) × 100
- **Infection Rate**: (Total Cases / Population) × 100
- **Vaccination Rate**: (People Vaccinated / Population) × 100
- **Fatality Rate**: (Total Deaths / Total Cases) × 100

## 🎨 Pages

- **Home (`/`)**: Portfolio overview with featured projects
- **Housing Cleaning (`/projects/housing-cleaning`)**: Data cleaning showcase
- **COVID Analysis (`/projects/covid-analysis`)**: Pandemic data analysis
- **Data Pipeline (`/projects/data-pipeline`)**: ETL process documentation

## 🔐 Data Privacy

- All data is anonymized or publicly available
- COVID data sourced from WHO/Johns Hopkins
- Housing data is public real estate records
- No personal information stored

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

## 📝 Data Cleaning Philosophy

This portfolio uses a **non-destructive approach**:

✅ **Database remains unchanged** - All transformations are demonstrated through SELECT queries
✅ **Visibility into raw data** - Shows original dirty data and cleaning process
✅ **Reproducibility** - All steps documented and executable
✅ **Audit trail** - Changes visible and traceable
✅ **Reversibility** - No data loss; original records always available

## 🛠️ Troubleshooting

### Connection Issues
- Verify Supabase URL and API key in `.env.local`
- Check network connectivity
- Ensure Supabase project is active

### Data Not Loading
- Confirm tables are created in Supabase
- Check database indexes
- Verify API endpoints are accessible

### Build Errors
- Run `npm install` to ensure all dependencies
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

Improvements and additions welcome! Areas for enhancement:

- Additional datasets
- Advanced visualizations
- Real-time data updates
- Export functionality
- Performance optimization

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a comprehensive data analyst portfolio demonstrating SQL, data analysis, and full-stack development skills.

---

**Last Updated:** 2024
**Portfolio Version:** 1.0.0

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
