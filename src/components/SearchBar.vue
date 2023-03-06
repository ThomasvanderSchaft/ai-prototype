<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title color="primary">Search</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      What would you like to see?
    </ion-card-content>
    <ion-searchbar placeholder="Search for anything..."></ion-searchbar>
  </ion-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonCardContent,
  IonCardTitle,
  IonCard,
  IonCardHeader,
  IonSearchbar

} from "@ionic/vue";

export default defineComponent({
  name: "SearchBar",
  components: {
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonSearchbar
  },
});
</script>
<style lang="scss" scoped>
ion-searchbar {
  --background: var(--background-color);
  --box-shadow: none;
}
</style>