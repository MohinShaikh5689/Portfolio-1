const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

// Convert Excel serial date to JavaScript Date
function excelDateToJSDate(excelDate) {
  if (!excelDate) return null
  // Excel epoch is January 1, 1900 (but with a leap year bug at 1900)
  // JavaScript epoch is January 1, 1970
  // Days between Excel epoch and Unix epoch: 25569
  const date = new Date((excelDate - 25569) * 86400 * 1000)
  return date.toISOString().split('T')[0]
}

// Parse date from various formats
function parseDate(dateValue) {
  if (!dateValue) return null
  
  // If it's a Date object (from cellDates: true)
  if (dateValue instanceof Date) {
    return dateValue.toISOString().split('T')[0]
  }
  
  // If it's a number, it's an Excel serial date
  if (typeof dateValue === 'number') {
    return excelDateToJSDate(dateValue)
  }
  
  // If it's a string, try to parse it
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue)
    if (!isNaN(parsed)) {
      return parsed.toISOString().split('T')[0]
    }
  }
  
  return null
}

// Initialize Supabase with service role key
const supabaseUrl = "https://xfytqcijceqmefgwaloc.supabase.co"
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmeXRxY2lqY2VxbWVmZ3dhbG9jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzQ0NzEwMywiZXhwIjoyMDkzMDIzMTAzfQ.7AOUAyzIAyqs6rJaIgOn4dop-uDoGGhyTM10uLQXDIk"
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Load COVID Deaths data
async function loadCovidDeaths() {
  console.log('📊 Loading COVID Deaths data...')
  try {
    const filePath = path.join(__dirname, '..', '..', 'CovidDeaths.xlsx')

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`)
      return
    }

    const workbook = XLSX.readFile(filePath, { cellDates: true })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)

    console.log(`  Reading ${data.length} rows from CovidDeaths.xlsx...`)

    // Transform and insert data in batches
    const batchSize = 100
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize).map((row) => ({
        iso_code: row['iso_code'] || null,
        continent: row['continent'] || null,
        location: row['location'] || null,
        date: parseDate(row['date']),
        total_cases: parseInt(row['total_cases']) || null,
        new_cases: parseInt(row['new_cases']) || null,
        new_cases_smoothed: parseFloat(row['new_cases_smoothed']) || null,
        total_deaths: parseInt(row['total_deaths']) || null,
        new_deaths: parseInt(row['new_deaths']) || null,
        new_deaths_smoothed: parseFloat(row['new_deaths_smoothed']) || null,
        total_cases_per_million: parseFloat(row['total_cases_per_million']) || null,
        new_cases_per_million: parseFloat(row['new_cases_per_million']) || null,
        new_cases_smoothed_per_million: parseFloat(row['new_cases_smoothed_per_million']) || null,
        total_deaths_per_million: parseFloat(row['total_deaths_per_million']) || null,
        new_deaths_per_million: parseFloat(row['new_deaths_per_million']) || null,
        new_deaths_smoothed_per_million: parseFloat(row['new_deaths_smoothed_per_million']) || null,
        reproduction_rate: parseFloat(row['reproduction_rate']) || null,
        icu_patients: parseInt(row['icu_patients']) || null,
        icu_patients_per_million: parseFloat(row['icu_patients_per_million']) || null,
        hosp_patients: parseInt(row['hosp_patients']) || null,
        hosp_patients_per_million: parseFloat(row['hosp_patients_per_million']) || null,
        weekly_icu_admissions: parseFloat(row['weekly_icu_admissions']) || null,
        weekly_icu_admissions_per_million: parseFloat(row['weekly_icu_admissions_per_million']) || null,
        weekly_hosp_admissions: parseFloat(row['weekly_hosp_admissions']) || null,
        weekly_hosp_admissions_per_million: parseFloat(row['weekly_hosp_admissions_per_million']) || null,
        population: parseInt(row['population']) || null,
        population_density: parseFloat(row['population_density']) || null,
        median_age: parseFloat(row['median_age']) || null,
        aged_65_older: parseFloat(row['aged_65_older']) || null,
        aged_70_older: parseFloat(row['aged_70_older']) || null,
        gdp_per_capita: parseFloat(row['gdp_per_capita']) || null,
        extreme_poverty: parseFloat(row['extreme_poverty']) || null,
        cardiovasc_death_rate: parseFloat(row['cardiovasc_death_rate']) || null,
        diabetes_prevalence: parseFloat(row['diabetes_prevalence']) || null,
        female_smokers: parseFloat(row['female_smokers']) || null,
        male_smokers: parseFloat(row['male_smokers']) || null,
        handwashing_facilities: parseFloat(row['handwashing_facilities']) || null,
        hospital_beds_per_thousand: parseFloat(row['hospital_beds_per_thousand']) || null,
        life_expectancy: parseFloat(row['life_expectancy']) || null,
        human_development_index: parseFloat(row['human_development_index']) || null,
        excess_mortality_cumulative_absolute: parseFloat(row['excess_mortality_cumulative_absolute']) || null,
        excess_mortality_cumulative: parseFloat(row['excess_mortality_cumulative']) || null,
        excess_mortality: parseFloat(row['excess_mortality']) || null,
        excess_mortality_cumulative_per_million: parseFloat(row['excess_mortality_cumulative_per_million']) || null,
      }))

      const { error } = await supabase.from('covid_deaths').insert(batch)

      if (error) {
        console.error(`  ❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message)
      } else {
        console.log(`  ✅ Inserted batch ${Math.floor(i / batchSize) + 1} (rows ${i + 1}-${Math.min(i + batchSize, data.length)})`)
      }
    }

    console.log(`✅ COVID Deaths loaded: ${data.length} rows`)
  } catch (error) {
    console.error('❌ COVID Deaths loading failed:', error)
  }
}

// Load COVID Vaccinations data
async function loadCovidVaccinations() {
  console.log('💉 Loading COVID Vaccinations data...')
  try {
    const filePath = path.join(__dirname, '..', '..', 'CovidVaccinations.xlsx')

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`)
      return
    }

    const workbook = XLSX.readFile(filePath, { cellDates: true })
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)

    console.log(`  Reading ${data.length} rows from CovidVaccinations.xlsx...`)

    const batchSize = 100
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize).map((row) => ({
        iso_code: row['iso_code'] || null,
        continent: row['continent'] || null,
        location: row['location'] || null,
        date: parseDate(row['date']),
        new_vaccinations: parseInt(row['new_vaccinations']) || null,
        new_vaccinations_smoothed: parseFloat(row['new_vaccinations_smoothed']) || null,
        new_vaccinations_smoothed_per_million: parseFloat(row['new_vaccinations_smoothed_per_million']) || null,
        new_people_vaccinated_smoothed: parseInt(row['new_people_vaccinated_smoothed']) || null,
        new_people_vaccinated_smoothed_per_hundred: parseFloat(row['new_people_vaccinated_smoothed_per_hundred']) || null,
        people_vaccinated: parseInt(row['people_vaccinated']) || null,
        people_vaccinated_per_hundred: parseFloat(row['people_vaccinated_per_hundred']) || null,
        people_fully_vaccinated: parseInt(row['people_fully_vaccinated']) || null,
        people_fully_vaccinated_per_hundred: parseFloat(row['people_fully_vaccinated_per_hundred']) || null,
        people_with_booster: parseInt(row['people_with_booster']) || null,
        people_with_booster_per_hundred: parseFloat(row['people_with_booster_per_hundred']) || null,
        total_vaccinations: parseInt(row['total_vaccinations']) || null,
        total_vaccinations_per_hundred: parseFloat(row['total_vaccinations_per_hundred']) || null,
        vaccine: row['vaccine'] || null,
      }))

      const { error } = await supabase.from('covid_vaccinations').insert(batch)

      if (error) {
        console.error(`  ❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message)
      } else {
        console.log(`  ✅ Inserted batch ${Math.floor(i / batchSize) + 1} (rows ${i + 1}-${Math.min(i + batchSize, data.length)})`)
      }
    }

    console.log(`✅ COVID Vaccinations loaded: ${data.length} rows`)
  } catch (error) {
    console.error('❌ COVID Vaccinations loading failed:', error)
  }
}

// Load Nashville Housing data
// async function loadNashvilleHousing() {
//   console.log('🏠 Loading Nashville Housing data...')
//   try {
//     const filePath = path.join(__dirname, '..', '..', 'Nashville Housing Data for Data Cleaning.xlsx')

//     if (!fs.existsSync(filePath)) {
//       console.warn(`⚠️  File not found: ${filePath}`)
//       return
//     }

//     const workbook = XLSX.readFile(filePath)
//     const sheet = workbook.Sheets[workbook.SheetNames[0]]
//     const data = XLSX.utils.sheet_to_json(sheet)

//     console.log(`  Reading ${data.length} rows from Nashville Housing data...`)

//     const batchSize = 100

//     for (let i = 0; i < data.length; i += batchSize) {
//       const batch = data.slice(i, i + batchSize).map((row) => {
//         const uniqueId =
//           parseInt(row['UniqueID']) ||
//           parseInt(row['unique_id'])

//         return {
//           ...(uniqueId ? { unique_id: uniqueId } : {}),

//           parcel_id: row['ParcelID'] || row['parcel_id'] || null,
//           land_use: row['LandUse'] || row['land_use'] || null,
//           property_address: row['PropertyAddress'] || row['property_address'] || null,
//           property_city: row['PropertyCity'] || row['property_city'] || null,
//           property_state: row['PropertyState'] || row['property_state'] || null,
//           zip_code: row['Zipcode'] || row['zip_code'] || null,
//           owner_name: row['OwnerName'] || row['owner_name'] || null,
//           owner_address: row['OwnerAddress'] || row['owner_address'] || null,
//           owner_city: row['OwnerCity'] || row['owner_city'] || null,
//           owner_state: row['OwnerState'] || row['owner_state'] || null,
//           owner_zip_code: row['OwnerZipCode'] || row['owner_zip_code'] || null,

//           sale_date: parseDate(row['SaleDate'] || row['sale_date']),

//           sale_price: parseInt(row['SalePrice']) || parseInt(row['sale_price']) || null,
//           sale_price_code: row['SalePriceCode'] || row['sale_price_code'] || null,
//           bedrooms_above_grade: parseInt(row['BedroomsAboveGrade']) || parseInt(row['bedrooms_above_grade']) || null,
//           bedrooms_below_grade: parseInt(row['BedroomsBelowGrade']) || parseInt(row['bedrooms_below_grade']) || null,
//           bathrooms_above_grade: parseFloat(row['BathroomsAboveGrade']) || parseFloat(row['bathrooms_above_grade']) || null,
//           bathrooms_below_grade: parseFloat(row['BathroomsBelowGrade']) || parseFloat(row['bathrooms_below_grade']) || null,
//           bathrooms_total: parseFloat(row['BathroomsTotalCalc']) || parseFloat(row['bathrooms_total']) || null,
//           total_living_area: parseInt(row['TotalLivingArea']) || parseInt(row['total_living_area']) || null,
//           tax_district: row['TaxDistrict'] || row['tax_district'] || null,
//           legal_reference: row['LegalReference'] || row['legal_reference'] || null,
//           year_built: parseInt(row['YearBuilt']) || parseInt(row['year_built']) || null,
//           building_sqft: parseInt(row['BuildingSqft']) || parseInt(row['building_sqft']) || null,
//           property_street_address: row['PropertyStreetAddress'] || row['property_street_address'] || null,
//           owner_street_address: row['OwnerStreetAddress'] || row['owner_street_address'] || null,
//           city_address: row['CityAddress'] || row['city_address'] || null,
//           state_address: row['StateAddress'] || row['state_address'] || null,
//           building_type: row['BuildingType'] || row['building_type'] || null,
//         }
//       })

//       const { error } = await supabase.from('nashville_housing').insert(batch)

//       if (error) {
//         console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message)
//       } else {
//         console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}`)
//       }
//     }

//     console.log(`✅ Nashville Housing loaded: ${data.length} rows`)
//   } catch (error) {
//     console.error('❌ Nashville Housing loading failed:', error)
//   }
// }



// Main execution
async function main() {
  console.log('🚀 Starting database setup...\n')

  console.log('📝 IMPORTANT: Execute schema.sql in Supabase SQL Editor first!')
  console.log('   Go to: https://app.supabase.com > SQL Editor > Paste schema.sql\n')

  console.log('Loading data from Excel files...\n')

  await loadCovidDeaths()
  console.log()
  await loadCovidVaccinations()
  console.log()
  // await loadNashvilleHousing()

  console.log('\n✨ Database setup completed!')
}

main().catch(console.error)
