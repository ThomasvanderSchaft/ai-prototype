<template>
<ion-page>
  <ion-header>
    <ion-toolbar color="white">
      <img src="../../assets/img/logo.png" alt="A-INSIGHTS logo">
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="ion-padding welcome-title"><span>Welcome, </span>{{user.name}}</div>
    <SearchBar></SearchBar>
    <NewsSection :news ="news"></NewsSection>
    <Performers></Performers>
    <Chart
      name="net-sales"
      title="Net sales"
      :datasets="[
        {
          label: 'Net sales',
          type: 'companyMetricDevelopment',
          metric: 'PLIncomeNetsales',
          company: customerCompanyId,
        },
      ]"
      :visual="{ line: { tension: 0.3 }, bar: { width: 0.7 } }"
      :actions="['exportImg', 'exportCSV', 'fullscreen']"
      colorScheme="timescale"
      :axes="{ y1: { label: 'Net sales', position: 'right' } }"
      :number-formatting="formatLargeNumberAs"
      :companyId="customerCompanyId"
    />
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,

} from "@ionic/vue";
import {getCompanyNameById, useDataState} from "@/state/Data";
import { useAppState } from "@/state/App";
import { useNewsState } from "@/state/news";
import Chart from "@/components/chart/Chart.vue";
import SearchBar from "@/components/SearchBar.vue";
import NewsSection from "@/components/news/NewsSection.vue";
import Performers from "@/components/performers/Performers.vue";

export default defineComponent({
  name: "HomePage",
  methods: {getCompanyNameById},
  setup() {
    const { user } = useAppState();
    const { news } = useNewsState();
    const { companies, customer } = useDataState()
    const formatLargeNumberAs = ref<'k' | 'b' | 'm'>('m')
    const customerCompanyId = computed(() => customer.value?.company_id)
    const peerGroupIds = computed(() =>
        Object.keys(customer.value?.companies ?? {})?.filter(
            (companyId) =>
                companies.value?.[companyId]?.display_name &&
                customer.value?.companies?.[companyId]?.peer &&
                companyId !== customerCompanyId.value
        )
    )
    const selectedPeerGroupIds = ref<string[]>(peerGroupIds.value.slice(0, 9))
    const datasets = computed(() => {
      const addCustomerCompany =
          getCompanyNameById(customerCompanyId.value) && false

      const result = {}
      ;[
        'PLIncomeNetsales',
        'PLProfitGrossmargin',
        'PLProfitPerGrossmargin',
        'PLProfitEBIT',
        'PLProfitPerEBIT',
        'PLProfitEBITDA',
        'PLProfitPerEBITDA',
        'ReturnRatiosReturnonAssets',
        'CFSOperOperationalcashflowCalc',
        'CapexOverallNetCapexTotaldepreciations',
      ].map((metricName) => {
        const metricDatasets = addCustomerCompany
            ? [
              {
                label: getCompanyNameById(customerCompanyId.value ?? '??'),
                type: 'companyMetricDevelopment',
                metric: metricName,
                company: customerCompanyId.value,
                colorScheme: 'timescale-customer',
                hideNulls: true,
              },
            ]
            : []
        selectedPeerGroupIds.value.forEach((pgid) => {
          metricDatasets.push({
            label: getCompanyNameById(pgid),
            type: 'companyMetricDevelopment',
            metric: metricName,
            company: pgid,
            colorScheme: 'timescale',
            hideNulls: true,
          })
        })
        result[metricName] = metricDatasets
      })
      return result
    })

    return { customer, user, formatLargeNumberAs, companies, datasets, customerCompanyId, news };
  },
  components: {
    Performers,
    NewsSection,
    SearchBar,
    Chart,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
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
.welcome-title {
  color: var(--primary-color);
  font-size: 1.4rem;
  span {
    color: var(--secondary-color);
  }
}
</style>
