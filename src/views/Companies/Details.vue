<template>
  <ion-page>
    <CompanyHeader/>
    <ion-content>
      <ProfileCard :data="company"/>
      <ProfileSegment :companyId="companyId" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {
  IonPage,
  IonContent,
} from "@ionic/vue";
import ProfileCard from "@/components/company/ProfileCard.vue";

import {useRoute} from "vue-router";
import {useDataState} from "@/state/Data";
import "vue-router/dist/vue-router";
import ProfileSegment from "@/components/company/ProfileSegment.vue";
import CompanyHeader from "@/components/headers/CompanyHeader.vue";
export default defineComponent({
  name: "CompaniesPage",
  setup() {
    const route = useRoute();
    const {companies} = useDataState()
    const companyId = computed(() => `${route.params.id}`)

    const company = computed(() => companies.value[companyId.value])
    return { route, company, companyId }
  },
  components: {
    CompanyHeader,
    ProfileSegment,
    IonPage,
    IonContent,
    ProfileCard
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
img {
  width: 5rem;
  padding: 0.5rem;
}
</style>
