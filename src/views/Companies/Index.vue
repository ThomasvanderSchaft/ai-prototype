<template>
  <ion-page>
    <MainHeader/>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Companies</ion-title>
          </ion-toolbar>
        </ion-card-header>
        <ion-list>
          <router-link  v-for="company in companyList"
                        :key="company.id" :to="{path: `companies/${company.id}`}">
            <ion-item

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
          </router-link>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import MainHeader from "@/components/headers/MainHeader.vue";
import {
  IonPage,
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
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    MainHeader
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
ion-label {

  h3 {
    font-size: 1rem;
    text-decoration: none;
    text-underline: none;
  }
}
img {
  width: 5rem;
  padding: 0.5rem;
}
</style>
