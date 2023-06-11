<template>
  <ion-header>
    <ion-toolbar color="white">
      <router-link to="/companies">
        <ion-icon aria-hidden="true" :icon="chevronBackOutline" />
      </router-link>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonIcon
} from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
export default defineComponent({
  name: "CompanyHeader",
  setup() {
    return { chevronBackOutline }
  },
  components: {
    IonHeader,
    IonToolbar,
    IonIcon
  },
});
</script>
<style lang="scss" scoped>
ion-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  padding-left: 0.5rem;
}
ion-header {
  background: var(--white);
}
</style>