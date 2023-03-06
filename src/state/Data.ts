import {computed, ref} from "vue";
import {getMetricInfo} from "@/state/metricInfo";

export const avg_metrics = ref();
export const base_url = ref();
export const companies = ref();
export const customer = ref();
export const customer_company_years = ref();
export const dashboards = ref();
export const industry_averages = ref();
export const metrics = ref();
export const user = ref();
export const years = ref();
export const getCompanyNameById = (companyId?: string) =>
    companyId && companies.value?.[companyId]?.display_name

// Calculate the highest year in which > 55% of company data is available
const fiftyFivePercentYear = computed(() => {
  let resultYear = 0
  const totalCompanies = Object.keys(companies.value ?? {}).length
  Object.keys(metricsPerYear.value)
      .sort()
      .forEach((year) => {
        const percentageAvailable =
            Object.keys(metricsPerYear.value[year]).length / totalCompanies

        if (percentageAvailable > 0.55) resultYear = parseInt(year)
      })

  return resultYear
})


// Transform the company -> metric -> year object into a year -> company -> metric object
const metricsPerYear = computed(() => {
  const result = {}
  Object.keys(metrics.value ?? {}).forEach((companyId) => {
    Object.keys(metrics.value?.[companyId] ?? {}).forEach((metricId) => {
      if (!getMetricInfo(metricId)?.is_special && metricId !== '_meta') {
        Object.keys(metrics.value?.[companyId]?.[metricId] ?? {}).forEach(
            (year) => {
              if (!result[year]) result[year] = {}
              if (!result[year][companyId]) result[year][companyId] = {}

              result[year][companyId][metricId] =
                  metrics.value?.[companyId]?.[metricId]?.[year]
            }
        )
      }
    })
  })
  return result
})



export const useDataState = () => {
  return {
    avg_metrics,
    base_url,
    companies,
    customer,
    customer_company_years,
    dashboards,
    industry_averages,
    metrics,
    user,
    years,
    metricsPerYear,
    fiftyFivePercentYear,
  };
};
