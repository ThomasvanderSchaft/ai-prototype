<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="white">
        <img src="../../assets/img/logo.png" alt="A-INSIGHTS logo">
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Companies</ion-title>
          </ion-toolbar>
        </ion-card-header>
        <ion-list>
          <ion-item
              v-for="company in companyList"
              :key="company.id"
              href="javascript:void"
              detail
          >
            <ion-avatar slot="start">
              <img alt="Company logo" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label
            ><h3>{{ company.display_name }}</h3>
              <p>{{ company.legal_entity }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card>
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
  IonLabel,
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
    IonLabel,
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
ion-header {
  background: var(--white);
}
img {
  width: 5rem;
  padding: 0.5rem;
}
</style>
