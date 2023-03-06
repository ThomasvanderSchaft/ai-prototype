export interface NewsResource {
    id: string
    title: string
    company: string
    date: string
    tags: string[]
    summary?: string
    link?: string
    image?: string
}
