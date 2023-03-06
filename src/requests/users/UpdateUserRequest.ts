import { UserUpdateNotificationRequest } from '@/requests/users/UserUpdateNotificationRequest'

export interface UpdateUserRequest {
    name?: string
    email?: string
    role?: string
    metric_preference?: string
    locale?: string
    notification_settings?: UserUpdateNotificationRequest
    current_bu_id?: string | null
}
