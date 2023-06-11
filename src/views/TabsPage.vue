<template>
  <ion-page>
    <ion-tabs v-if="hasLoaded">
      <ion-router-outlet />
      <ion-tab-bar slot="bottom" color="primary" mode="md" translucent>
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon aria-hidden="true" :icon="newspaper" />
          <ion-label>What's new</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/news">
          <ion-icon aria-hidden="true" :icon="barChart" />
          <ion-label>News</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/companies">
          <ion-icon aria-hidden="true" :icon="business" />
          <ion-label>Companies</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" :href="`/companies/${customerCompanyId}`">
          <ion-icon aria-hidden="true" :icon="peopleCircle" />
          <ion-label>{{ customerName }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useDataState } from "@/state/Data";

import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { newspaper, barChart, business, peopleCircle } from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  setup() {
    const { customer } = useDataState();
    return {
      customerName: computed(() => customer.value.name ?? "More"),
      customerCompanyId: computed(() => customer.value.company_id ?? "??"),
      hasLoaded: computed(() => !!customer.value),
      // Icons
      newspaper,
      barChart,
      business,
      peopleCircle,
    };
  },
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
});
</script>

<style lang="scss" scoped>
</style>
