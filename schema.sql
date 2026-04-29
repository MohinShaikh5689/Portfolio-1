-- Supabase PostgreSQL Schema for Data Analyst Portfolio
-- Execute these queries in Supabase SQL Editor to set up the database

-- 1. COVID Deaths Table
CREATE TABLE IF NOT EXISTS covid_deaths (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  iso_code VARCHAR(10),
  continent VARCHAR(50),
  location VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  total_cases BIGINT,
  new_cases BIGINT,
  new_cases_smoothed FLOAT,
  total_deaths BIGINT,
  new_deaths BIGINT,
  new_deaths_smoothed FLOAT,
  total_cases_per_million FLOAT,
  new_cases_per_million FLOAT,
  new_cases_smoothed_per_million FLOAT,
  total_deaths_per_million FLOAT,
  new_deaths_per_million FLOAT,
  new_deaths_smoothed_per_million FLOAT,
  reproduction_rate FLOAT,
  icu_patients BIGINT,
  icu_patients_per_million FLOAT,
  hosp_patients BIGINT,
  hosp_patients_per_million FLOAT,
  weekly_icu_admissions FLOAT,
  weekly_icu_admissions_per_million FLOAT,
  weekly_hosp_admissions FLOAT,
  weekly_hosp_admissions_per_million FLOAT,
  population BIGINT,
  population_density FLOAT,
  median_age FLOAT,
  aged_65_older FLOAT,
  aged_70_older FLOAT,
  gdp_per_capita FLOAT,
  extreme_poverty FLOAT,
  cardiovasc_death_rate FLOAT,
  diabetes_prevalence FLOAT,
  female_smokers FLOAT,
  male_smokers FLOAT,
  handwashing_facilities FLOAT,
  hospital_beds_per_thousand FLOAT,
  life_expectancy FLOAT,
  human_development_index FLOAT,
  excess_mortality_cumulative_absolute FLOAT,
  excess_mortality_cumulative FLOAT,
  excess_mortality FLOAT,
  excess_mortality_cumulative_per_million FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. COVID Vaccinations Table
CREATE TABLE IF NOT EXISTS covid_vaccinations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  iso_code VARCHAR(10),
  continent VARCHAR(50),
  location VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  new_vaccinations BIGINT,
  new_vaccinations_smoothed FLOAT,
  new_vaccinations_smoothed_per_million FLOAT,
  new_people_vaccinated_smoothed BIGINT,
  new_people_vaccinated_smoothed_per_hundred FLOAT,
  people_vaccinated BIGINT,
  people_vaccinated_per_hundred FLOAT,
  people_fully_vaccinated BIGINT,
  people_fully_vaccinated_per_hundred FLOAT,
  people_with_booster BIGINT,
  people_with_booster_per_hundred FLOAT,
  total_vaccinations BIGINT,
  total_vaccinations_per_hundred FLOAT,
  vaccine VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Nashville Housing Table
CREATE TABLE IF NOT EXISTS nashville_housing (
  unique_id BIGINT PRIMARY KEY,
  parcel_id VARCHAR(50),
  land_use VARCHAR(50),
  property_address VARCHAR(255),
  property_city VARCHAR(100),
  property_state VARCHAR(10),
  zip_code VARCHAR(10),
  owner_name VARCHAR(255),
  owner_address VARCHAR(255),
  owner_city VARCHAR(100),
  owner_state VARCHAR(10),
  owner_zip_code VARCHAR(10),
  sale_date DATE,
  sale_price BIGINT,
  sale_price_code VARCHAR(1),
  bedrooms_above_grade SMALLINT,
  bedrooms_below_grade SMALLINT,
  bathrooms_above_grade FLOAT,
  bathrooms_below_grade FLOAT,
  bathrooms_total FLOAT,
  total_living_area BIGINT,
  tax_district VARCHAR(50),
  legal_reference VARCHAR(100),
  year_built SMALLINT,
  building_sqft BIGINT,
  property_street_address VARCHAR(255),
  owner_street_address VARCHAR(255),
  city_address VARCHAR(100),
  state_address VARCHAR(10),
  building_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_covid_deaths_location_date ON covid_deaths(location, date);
CREATE INDEX idx_covid_deaths_location ON covid_deaths(location);
CREATE INDEX idx_covid_deaths_date ON covid_deaths(date);

CREATE INDEX idx_covid_vaccinations_location_date ON covid_vaccinations(location, date);
CREATE INDEX idx_covid_vaccinations_location ON covid_vaccinations(location);
CREATE INDEX idx_covid_vaccinations_date ON covid_vaccinations(date);

CREATE INDEX idx_nashville_parcel_id ON nashville_housing(parcel_id);
CREATE INDEX idx_nashville_property_address ON nashville_housing(property_address);
CREATE INDEX idx_nashville_sale_date ON nashville_housing(sale_date);
CREATE INDEX idx_nashville_sale_price ON nashville_housing(sale_price);

-- Enable Row Level Security (RLS) - Optional
-- Uncomment if you want to add access control
-- ALTER TABLE covid_deaths ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE covid_vaccinations ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE nashville_housing ENABLE ROW LEVEL SECURITY;

-- Create view for COVID analysis
CREATE OR REPLACE VIEW v_covid_analysis AS
SELECT 
  d.date,
  d.location,
  d.total_cases,
  d.total_deaths,
  d.population,
  ROUND(((d.total_deaths::NUMERIC / NULLIF(d.total_cases, 0)) * 100)::NUMERIC, 2) AS death_percentage,
  ROUND(((d.total_cases::NUMERIC / NULLIF(d.population, 0)) * 100)::NUMERIC, 4) AS infection_percentage,
  v.people_vaccinated,
  v.people_fully_vaccinated,
  ROUND(((v.people_vaccinated::NUMERIC / NULLIF(d.population, 0)) * 100)::NUMERIC, 2) AS vaccination_percentage
FROM covid_deaths d
LEFT JOIN covid_vaccinations v 
  ON d.location = v.location 
  AND d.date = v.date;

-- Create view for Housing Analysis
CREATE OR REPLACE VIEW v_housing_analysis AS
SELECT 
  parcel_id,
  property_address,
  property_city,
  sale_date,
  sale_price,
  bedrooms_above_grade,
  bathrooms_total,
  total_living_area,
  CASE 
    WHEN sale_price > 0 THEN ROUND((sale_price::NUMERIC / NULLIF(total_living_area, 0))::NUMERIC, 2)
    ELSE 0
  END AS price_per_sqft,
  EXTRACT(YEAR FROM CURRENT_DATE) - year_built AS age_of_building
FROM nashville_housing
WHERE sale_price > 0
  AND total_living_area > 0;

-- Allow executing arbitrary queries (FOR PORTFOLIO DEMO PURPOSES ONLY)
-- In a real production system, do not expose a raw execute_query RPC like this.
CREATE OR REPLACE FUNCTION execute_query(query_text text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
  cleaned_query text;
BEGIN
  -- Remove trailing semicolons and whitespace from the query
  cleaned_query := TRIM(TRAILING ';' FROM TRIM(query_text));
  
  -- Use format to safely handle the query text
  EXECUTE format('SELECT COALESCE(json_agg(row_to_json(t)), ''[]''::json) FROM (%s) t', cleaned_query) INTO result;
  
  IF result IS NULL THEN
    result := '[]'::json;
  END IF;
  
  RETURN result;
END;
$$;
