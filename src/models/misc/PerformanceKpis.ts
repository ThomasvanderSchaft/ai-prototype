export interface PerformanceKpis {
    net_sales: PerformanceKpi
    gross_margin: PerformanceKpi
    ebit: PerformanceKpi
    ebitda: PerformanceKpi
    assets: PerformanceKpi
}

export interface PerformanceKpi {
    value: number
    customer_value: number
    customer_difference: number
    industry_value: number
    industry_difference: number
}
