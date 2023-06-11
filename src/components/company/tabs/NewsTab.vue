<template>
  <NewsSection :news ="news"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewsSection from "@/components/news/NewsSection.vue";
import {useNewsState} from "@/state/news";
export default defineComponent({
  name: "NewsTab",
  setup() {
    const { news } = useNewsState();
    return { news };
  },
  components: {
    NewsSection
  },
});
</script>