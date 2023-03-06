export interface CompanyFinancialResultResource {
    Customer_ID: string
    Customer_Name: string
    Company_ID: string
    Company_Name: string
    Metric_Name: string
    Metric_Name_EN: string
    Metric_Name_NL: string
    Year: string
    Value: number
    Metric_Type?: string
    Customer?: number
    Created_At?: string
    Value_Type?: string
    // Optional values
    Industry_Value?: number
    Diff_2_Value?: number
    Currency_code?: string | null
    currency_code?: string | null
    Customer_Company_ID?: string | null
    Customer_Company_Name?: string | null
    Customer_Value?: number | null
    Value_Chain_Link_Name?: string
    Country_Code?: string
    Country_Name?: string
    Peer_Group?: number
    Guideline?: string
    Development_Value?: number
    Sort?: number
}
