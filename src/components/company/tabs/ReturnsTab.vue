<template>
  <ion-card-header>
    <ion-card-title color="primary">Returns</ion-card-title>
  </ion-card-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCardHeader,
  IonCardTitle
} from "@ionic/vue";
export default defineComponent({
  name: "ReturnsTab",
  components: {
    IonCardHeader,
    IonCardTitle
  },
});
</script>