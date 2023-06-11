<template>
  <ion-card-header>
    <ion-card-title color="primary">News</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <ion-label v-if="!allNews">No articles were found</ion-label>
    <ion-item v-for="article in allNews" :key="article.id" :href="article.url" detail button>
      <NewsArticle v-if="article" :article="article" />
    </ion-item>
  </ion-card-content>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {
  IonCardTitle,
  IonCardHeader,
  IonItem,
  IonCardContent
} from "@ionic/vue";
import NewsArticle from "@/components/news/NewsArticle.vue";
import { NewsItemType } from "@/state/news";
export default defineComponent({
  name: 'NewsSection',
  props: {
    news: { required: false, type: Object },
    companyId: { required: false, type: String}
  },
  setup(props) {
    const allNews = computed(() => {
      const result: NewsItemType[] = []
      Object.keys(props?.news?.value ?? {}).map((companyId) => {
        if (props?.news?.value) {
          props?.news?.value[companyId].map((newsItem) => {
            props.companyId ?
            newsItem.company == props.companyId ?
                result.push({...newsItem, companyId}) :
                "" : result.push({...newsItem, companyId})
          })
        }
      })
      props.companyId ? result?.slice(0, 7) : ""
      return result.length > 0
          ? result.sort(
              (a, b) => Date.parse(`${b.published}`) - Date.parse(`${a.published}`)
          )
          : undefined
    })

    return {
      allNews
    }
  },
  components: {
    NewsArticle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonItem,
  },
})
</script>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
