<template>
<ion-page>
      <ion-header>
        <ion-toolbar color="white">
          <img src="../../assets/img/logo.png" alt="A-INSIGHTS logo">
        </ion-toolbar>
      </ion-header>
  <ion-content :fullscreen="true">
    <div class="ion-padding welcome-title"><span>Welcome, </span>{{user.name}}</div>
    <ion-card>
      <ion-card-header>
        <ion-card-title color="primary">Search</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        What would you like to see?
      </ion-card-content>
      <ion-searchbar placeholder="Search for anything..."></ion-searchbar>
    </ion-card>
    <ion-card>
      <ion-card-header>
        <ion-card-title color="primary">News</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        What would you like to see?
      </ion-card-content>
    </ion-card>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonSearchbar

} from "@ionic/vue";
import { useDataState } from "@/state/Data";
import { useAppState } from "@/state/App";

export default defineComponent({
  name: "HomePage",
  setup() {
    const { customer } = useDataState();
    const { user } = useAppState();
    return { customer, user };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonSearchbar,

  },
});
</script>

<style lang="scss" scoped>
img {
  width: 3rem;
  padding: 0.5rem;
}
ion-searchbar {
  --box-shadow: none;
  --background: var(--background-color);
}
ion-content {
  --background: var(--background-color);
}
ion-card {
  background: var(--white);
}
ion-header {
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
