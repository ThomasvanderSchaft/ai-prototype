import { NewsResource } from '../misc/NewsResource'
import { PerformanceKpis } from '@/models/misc/PerformanceKpis'
import { CompanyFinancialResultResource } from '@/models/company/CompanyFinancialResultResource'
import { Dictionary } from '@/types'
import { CompanyInsightResource } from '@/models/company/CompanyInsightResource'
import { ReportResource } from '@/models/report/ReportResource'

// Company product types
export const PRODUCT_TYPE_FULL = 'full'
export const PRODUCT_TYPE_TOPLINE = 'topline'
export const PRODUCT_TYPE_PROFILE = 'profile'
export const PRODUCT_TYPE_CUSTOM = 'custom'
export const PRODUCT_TYPE_ONEPAGER = 'onepager'

export interface CompanyDetailDataPerYearResource {
    year: string
    performance_indicator: string
    ebit_performance: string
    ebit_performance_text: string
    ebitda_performance: string
    ebitda_performance_text: string
    performance_kpis: PerformanceKpis
}
export interface CompanyDetailResource {
    id: string
    new: boolean
    absolutes?: {
        ebit_ebitda: CompanyFinancialResultResource[]
        gross_margin: CompanyFinancialResultResource[]
        return_ratio: CompanyFinancialResultResource[]
    }
    company_name: string
    company_logo: string
    company_type: string
    entity_name: string
    country: string
    website: string
    year: number
    performance_indicator: string
    net_sales: number
    ebit_performance: string
    ebit_performance_text: string
    ebitda_performance: string
    ebitda_performance_text: string
    ebit: number
    ebit_year_growth: number
    ebitda: number
    ebitda_year_growth: number
    updated_at: string
    value_chain: string
    value_chain_link: string
    product_type: string
    product_category: string
    product_group: string
    peer_group: boolean
    news: NewsResource[]
    performance_kpis: PerformanceKpis
    net_sales_data?: CompanyFinancialResultResource[]
    profitability_data?: CompanyFinancialResultResource[]
    data_per_year?: CompanyDetailDataPerYearResource[]
    key_ratios?: CompanyFinancialResultResource[]
    tabs: Dictionary<boolean>
    insights?: CompanyInsightResource[]
    reports?: ReportResource[]
    export_url?: string
}
