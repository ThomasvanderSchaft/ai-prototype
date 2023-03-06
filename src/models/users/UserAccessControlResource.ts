export interface UserAccessControlResource {
    see_dashboards: boolean
    see_analysis: boolean
    see_workshops: boolean
    see_projects: boolean
    see_other: boolean
    blocked_dashboards: string[]
    [key: string]: boolean | string[]
}
