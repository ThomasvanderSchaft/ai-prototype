<template>
  <ion-header>
    <ion-toolbar color="white">
      <img src="../../assets/img/logo.png" alt="A-INSIGHTS logo">
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar
} from "@ionic/vue";
export default defineComponent({
  name: "CompanyHeader",
  components: {
    IonHeader,
    IonToolbar
  },
});
</script>
<style lang="scss" scoped>
ion-header {
  background: var(--white);
}
img {
  width: 5rem;
  padding: 0.5rem;
}
</style>