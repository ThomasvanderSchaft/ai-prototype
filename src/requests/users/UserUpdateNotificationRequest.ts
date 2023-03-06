import { UserNotificationSettingsResource } from '@/models/users/UserNotificationsSettingsResource'

export interface UserUpdateNotificationRequest {
    type: keyof UserNotificationSettingsResource
    setting: boolean
}
