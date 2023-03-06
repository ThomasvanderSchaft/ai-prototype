import { ref } from "vue";
import {
    avg_metrics,
    base_url,
    companies,
    customer,
    customer_company_years,
    dashboards,
    industry_averages,
    metrics,
    years
} from "./Data";
import {
    allNewsItems
} from "./news";

export const user = ref();
export const ip = ref(localStorage.getItem("ip") ?? "localhost");

export const useAppState = () => {
  return { user, ip };
};

// During development login and DF request will be one to avoid CSRF protection. This is not acceptable for production.
// A seperate backend needs to be spun up for production.
export const signIn = (ip: string, email: string, password: string) =>
  new Promise<void>((resolve) => {
    fetch(`http://${ip}:8082/api/web/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((_data) => {
        user.value = _data.user;
        avg_metrics.value = _data.data.avg_metrics;
        base_url.value = _data.data.base_url;
        companies.value = _data.data.companies;
        customer.value = _data.data.customer;
        customer_company_years.value = _data.data.customer_company_years;
        dashboards.value = _data.data.dashboards;
        industry_averages.value = _data.data.industry_averages;
        metrics.value = _data.data.metrics;
        years.value = _data.data.years;
        allNewsItems.value = _data.news.en;
        localStorage.setItem("ip", ip);
        resolve();
      });
  });
