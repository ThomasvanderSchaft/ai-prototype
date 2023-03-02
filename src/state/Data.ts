import { ref } from "vue";

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
  };
};
