import { UserCompanyCustomerSettingsResource } from './UserCompanyCustomerSettingsResource'

export interface UserCompanyResource {
    id: string
    customer_company_id: string
    name: string
    show_one_pager: string
    registered_date: string
    account_manager_name: string
    account_manager_email: string
    account_manager_phone: string
    account_manager_logo: string
    logo: string
    customer_settings: UserCompanyCustomerSettingsResource
    parent_of?: string
    is_holding?: '1' | '0'
    parent_id?: string
    contract_end?: Date
}
