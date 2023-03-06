<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title color="primary">News</ion-card-title>
    </ion-card-header>
    <ion-card-content>
        <ion-item v-for="article in allNews?.slice(0, 7)" :key="article.id" :href="article.url" detail button>
          <NewsArticle :article="article" />
        </ion-item>
    </ion-card-content>
  </ion-card>

</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {
  IonCardTitle,
  IonCard,
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
    companies: { required: false, type: Object },
  },
  setup(props) {
    const allNews = computed(() => {
      const result: NewsItemType[] = []
      Object.keys(props?.news?.value ?? {}).map((companyId) => {
        if (props?.news?.value) {
          props?.news?.value[companyId].map((newsItem) => {
            result.push({...newsItem, companyId})
          })
        }
      })

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
    IonCard,
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
