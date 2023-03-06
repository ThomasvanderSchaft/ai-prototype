import { CompanyFinancialResultResource } from './CompanyFinancialResultResource'

export interface CompanyDeepdiveResource {
    [key: string]: CompanyFinancialResultResource[]
}
