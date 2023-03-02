<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Companies</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Companies</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item
          v-for="company in companyList"
          :key="company.id"
          href="javascript:void"
          detail
        >
          <ion-label
            ><h3>{{ company.display_name }}</h3>
            <p>{{ company.legal_entity }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/vue";
import { useDataState } from "@/state/Data";

export default defineComponent({
  name: "CompaniesPage",
  setup() {
    const { companies } = useDataState();
    return {
      companyList: computed(() =>
        Object.keys(companies.value).map((companyId) => ({
          ...companies.value[companyId],
        }))
      ),
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
  },
});
</script>

<style lang="scss" scoped>
.companies-page {
  background-color: red;
}
</style>
