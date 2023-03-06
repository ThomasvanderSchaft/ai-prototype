export interface CompanyConcernResource {
    Company_ID: string
    Company_Name: string
    DUNS_Root_Tree: string | null
    Company_Name_Tree: string
    DUNS_Parent_Tree: string | null
    DUNS_Tree: string | null
    Hierarchy_Level_Tree: number
    Company_Of_Interest_Tree: boolean
    Number_Of_Members_Tree: number
    childNodes?: CompanyConcernResource[]
}
