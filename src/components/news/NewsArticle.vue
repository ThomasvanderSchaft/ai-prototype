<template>
  <div class="article">
    <h2 class="article-title">{{ article.title }}</h2>
    <h3 class="article-stamp">
      <div class="article-link">{{ getCompanyNameById(article.company)  }}</div>
      &nbsp;-&nbsp;
      <div class="article-date">{{ formatDate(new Date(article.published)) }}</div>
    </h3>
    <div class="article-tags">
      <ion-chip v-for="tag in article.tags" :key="tag" class="article-tag" color="primary">{{ tag }}</ion-chip>
    </div>
    <p class="article-description"> {{ article.summary }}... </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from '@/helpers/formatDate'
import {
  IonChip
} from "@ionic/vue";
import {getCompanyNameById} from "@/state/Data";
export default defineComponent({
  name: 'NewsSection',
  methods: {getCompanyNameById},
  props: {
    article: { required: false, type: Object },
  },
  setup() {
    return { formatDate }
  },
  components: {
    IonChip
  }
})
</script>

<style lang="scss" scoped>
.article {
  &-title {
    font-weight: bold;
  }
  &-stamp {
    display: flex;
  }
  &-link {
    color: var(--ion-color-primary);
  }
  &-tags {
    display: flex;
  }
  padding-bottom: 2rem;
}
</style>