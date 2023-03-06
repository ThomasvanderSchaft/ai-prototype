import { dataType } from '@/helpers/valueFormatter'

export type Dictionary<T> = { [key: string]: T }

export interface Pagination {
    total: number
    per_page: number
    current_page: number
    last_page: number
}

export interface IndexResponse<T = undefined> {
    data: T[]
    meta?: Pagination
    filters?: Dictionary<SelectItem[]>
}

export interface DetailResponse<T = undefined> {
    data: T
}

export interface IndexParameters {
    column?: string
    dir?: string
    page?: string
    search?: string

    [key: string]: string | Array<string | null> | undefined
}

export interface SelectItem<T = string | number> {
    value: T
    label: string
    disabled?: boolean
}

export interface ValidationErrors {
    [key: string]: string[]
}

export interface ErrorResource {
    status: number
    statusText: string
    data: {
        message: string
        errors: ValidationErrors
    }
}

export interface TableHeader {
    label?: string
    key?: string
    canSort?: boolean
    align?: 'left' | 'right' | 'wrap'
}

export interface BarChartComparisonDatasetItem {
    label: string
    backgroundColor: string
    // TODO: Figure out what this is
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    companyData: string
}

export interface BarChartDatasetItem {
    label: string
    backgroundColor: string
    // TODO: Figure out what this is
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    currency: string
}

export interface BubbleChartDatasetDataItem {
    x: number | null
    y: number | null
    r: number | null
    rValue?: number | null
    xLabel: string
    yLabel: string
    rLabel: string
    xFormatType: dataType
    yFormatType: dataType
    rFormatType: dataType
    xDivideBy: number
    yDivideBy: number
    rDivideBy: number
    label: string
    companyId: string
}
export interface BubbleChartDataSetItem {
    borderColor: string[]
    borderWidth?: number
    backgroundColor: string[]
    data: BubbleChartDatasetDataItem[]
}
export interface BubbleChartDataSet {
    datasets: BubbleChartDataSetItem[]
    currency: string
    labels: string[]
}

export interface IndustryPerformerDataSet {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    companies: any[]
}

export interface ComparisonDataSet {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customer: any[]
    peers: Dictionary<number>
}

export interface MultiBarChartDataSetItem {
    label: string
    backgroundColor: string[] | string
    borderColor?: string[] | string
    data: Dictionary<number | null>
    type?: 'line' | 'bar'
    currency?: string
    order?: number
    divideBy?: number
    yAxisID?: string
    dataType?: string
}
export interface MultiBarChartDataSet {
    datasets: MultiBarChartDataSetItem[]
    yDataType?: dataType
    y1DataType?: dataType
    currency?: string
    labels: string[]
}

export interface MultiLineChartDataSetItem {
    label: string
    backgroundColor: string[] | string
    borderColor: string[] | string
    data: Dictionary<number | null>
    ownDataSet: boolean
}

export interface MultiLineChartDataSet {
    datasets: MultiLineChartDataSetItem[]
    labels: string[]
}

export interface Legend {
    labels: string[]
    includesOwnCompany: boolean
}

export type MetricPreference = 'EBIT' | 'EBITDA'

export type CurrencyCode = 'EUR'
export type CompanyProductType = 'onepager' | 'topline'
export type ProductType = 'performance_monitor' | 'provider_monitor'
export type PackageType = 'base' | 'premium' | 'enterprise' | ''
export type AddonType = 'Market Monitor' | 'Workshop'
export type LanguageType = 'EN' | 'NL'
export type RoleType = 'admin' | 'company_admin' | 'user'

export interface AddressType {
    street: string
    zip_code: string
    city: string
    country: string
}

export interface AccountManagerType {
    name: string
    email: string
    phone: string
    photo: string
}

export interface UserType {
    name: string
    access_control: {
        blocked_dashboards: string[]
        see_analysis: boolean
        see_dashboards: boolean
        see_other: boolean
        see_projects: boolean
        see_workshops: boolean
    }
    can_switch_bu: boolean
    bu_blacklist?: string
    customer_id: string
    email: string
    id: string
    invited_on: Date
    last_login: Date
    locale: LanguageType
    metric_preference: MetricPreference
    notification_settings: {
        company_insights: boolean
        weekly_news: boolean
        weekly_reports: boolean
    }
    role: RoleType
}

export interface CustomerType {
    name: string
    id: string
    display_name: string
    documents: DocumentType[]
    accountmanager: AccountManagerType
    companies: {
        [companyKey: string]: {
            peer: boolean
            industry: boolean
            self: boolean
            product: CompanyProductType
            list: 'peer' | 'industry' | 'non-peer'
        }
    }
    company_id: string
    contract: {
        product: ProductType
        package: PackageType
        addons: AddonType[]
        end: Date
    }
    holding: {
        is_holding: boolean
        parent: string
        parent_of: string[]
    }
    preferences: { language: LanguageType; currency: CurrencyCode }
}

export interface DocumentType {
    name: string
    date: Date
    folder: string
    doc_id: string
    file_type: string
    type: 'Project' | 'Workshop'
}

export interface CompanyType {
    id: string
    name: string
    display_name: string
    documents: DocumentType[]
    concern?: ConcernTreeItemType[]
    key_insights?: {
        [language: string]: {
            [year: string]: { [index: number]: { title: string; content: string } }
        }
    }
    automated_insights?: {
        [language: string]: {
            [year: number]: {
                [metric: string]: {
                    title: string
                    content: string
                }
            }
        }
    }
    food?: {
        industry: string
        product_category_primary: string
        product_group_primary: string
        value_chain: string
        value_chain_link_primary: string
    }
    health?: {
        healthtype_primary: string
        healthtype_secondary: string
    }
    currency: { code: CurrencyCode; name: string }
    legal_form: 'B.V.'
    legal_entity: string
    logo?: string
    address: AddressType
    news:
        | []
        | { nl: CompanyNewsType[]; de: CompanyNewsType[]; en: CompanyNewsType[] }
    indicators: {
        PLProfitEBITDAImprovementPotential: { [year: number]: number }
        PLProfitEBITImprovementPotential: { [year: number]: number }
        PLProfitEBITDAIndicator: {
            [year: number]:
                | 'Top 5 Performer'
                | 'Above Average'
                | 'Average'
                | 'Below Average'
        }
        PLProfitEBITIndicator: {
            [year: number]:
                | 'Top 5 Performer'
                | 'Above Average'
                | 'Average'
                | 'Below Average'
        }
    }
    numbers: {
        duns?: string
        coc?: string
        agb?: string
    }
    website: string
    last_updated: Date
    max_year: number
}

export interface ConcernTreeItemType {
    id: string
    name: string
    hierarchy_level: number
    duns: string
    duns_parent: string
    duns_root: string
    children?: ConcernTreeItemType[]
    indentation?: number
}

export interface CompanyNewsType {
    title: string
    id: string
    summary: string
    image?: string
    company: string
    url: string
    tags?: string[]
    published: string
}

export type MetricType =
    | {
    [year: number]: number
}
    | {
    [year: number]: { [currencyCode: string]: number }
}

export interface DataFeedResponseType {
    base_url: string
    user: UserType
    customer: CustomerType
    companies: { [key: string]: CompanyType }
    dashboards: DashboardType[]
    metrics: { [companyKey: string]: { [metricKey: string]: MetricType } }
    years: number[]
    customer_company_years: number[]
    data?: string
    error?: string
}
export interface LogosResponseType {
    logos: { [key: string]: string }
}

// News & Trends
export interface NewsItemType {
    title: string
    summary: string
    link: string
    date: Date
    tags: { name_en: string; name_nl: string }[]
    company: string
    image?: string
}

export interface ReportItemType {
    title: { nl: string; en: string } | string
    summary?: string
    url: string
    date: Date
    tags: string[]
    product_type?: string
    type?: string
    company?: string
    value_chain?: string
}

export interface DashboardType {
    name: { en: string; nl: string }
    id: string
    group: string
    report_id: string
}

export interface ExportTemplateType {
    id: string
    customer_id: string
    user_id: string
    user_name
    name: string
    data: string
    shared: boolean | '1' | '0'
}
export interface NewExportTemplateType {
    name: string
    data: string
    shared: boolean
}
export interface AIExportTemplateType {
    id: string
    data: { companies: string; metrics: string[]; years: string }
    name: string
}
