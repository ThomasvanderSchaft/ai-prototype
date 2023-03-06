export interface NotificationResource {
    id: string
    notifiable_id: string
    notifiable_type: boolean
    type: string
    data: {
        company_id: string
        company_name: string
        type: string
    }
    read_at: string
    created_at: string
}
