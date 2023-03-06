export interface CustomerTopBottomPerformersCollectionResource {
    top_performers: CompanyTopBottomPerformersResource[]
    bottom_performers: CompanyTopBottomPerformersResource[]
}

export interface CompanyTopBottomPerformersResource {
    id: string
    new: boolean
    company_name: string
    company_logo: string
    company_type: string
    year: string
    ebit: number
    ebit_net_sales_year_growth: number
    ebitda: number
    ebitda_net_sales_year_growth: number
    sort: number
    peer_group: boolean
    is_customer: boolean
    currency: string | null
    updated_at: string
}
