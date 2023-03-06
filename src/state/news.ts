import { computed, ref } from 'vue'
export interface NewsItemType {
    title: string
    summary: string
    link: string
    date: Date
    tags: string[]
    company: string
    image?: string
    published: Date
    id: string
    url: string
}

export const allNewsItems = ref<NewsItemType[]>()

export const useNewsState = () => {
    // Localized news
    const news = computed(() => allNewsItems)
    console.log(news)
    return { news }
}
