<template>
  <ion-page>
    <MainHeader/>
    <ion-content :fullscreen="true">
      <div class="ion-padding welcome-title"><span>Welcome, </span>{{user.name}}</div>
      <SearchBar/>
      <ion-card>
        <NewsSection :news ="news"/>
      </ion-card>
      <Performers/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonCard,
} from "@ionic/vue";
import { useAppState } from "@/state/App";
import { useNewsState } from "@/state/news";
import SearchBar from "@/components/SearchBar.vue";
import NewsSection from "@/components/news/NewsSection.vue";
import Performers from "@/components/performers/Performers.vue";
import MainHeader from "@/components/headers/MainHeader.vue";

export default defineComponent({
  name: "HomePage",
  setup() {
    const { user } = useAppState();
    const { news } = useNewsState();
    return { user, news };
  },
  components: {
    Performers,
    NewsSection,
    SearchBar,
    IonPage,
    IonContent,
    IonCard,
    MainHeader
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  --background: var(--background-color);
}
ion-card {
  background: var(--white);
}
.welcome-title {
  color: var(--primary-color);
  font-size: 1.4rem;
  span {
    color: var(--secondary-color);
  }
}
</style>
