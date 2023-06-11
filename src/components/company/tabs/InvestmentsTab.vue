<template>
  <ion-card-header>
    <ion-card-title color="primary">Investments</ion-card-title>
  </ion-card-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCardHeader,
  IonCardTitle
} from "@ionic/vue";
export default defineComponent({
  name: "InvestmentsTab",
  components: {
    IonCardHeader,
    IonCardTitle
  },
});
</script>