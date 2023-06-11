<template>
  <ion-card-header>
    <ion-card-title color="primary">Financial Health</ion-card-title>
  </ion-card-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCardHeader,
  IonCardTitle
} from "@ionic/vue";
export default defineComponent({
  name: "FinancialHealth",
  components: {
    IonCardHeader,
    IonCardTitle
  },
});
</script>