<template>
    <ion-card-header>
      <ion-card-title color="primary">Performance KPI's</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-select v-model="selectedOption" :placeholder="selectedOption.toString()">
        <ion-select-option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</ion-select-option>
      </ion-select>
      <ion-grid>
        <ion-row>
          <ion-col>&nbsp;</ion-col>
          <ion-col>{{ getCompanyNameById(companyId) }}</ion-col>
          <ion-col>Avg.</ion-col>
          <ion-col>Diff.</ion-col>
        </ion-row>
        <ion-row v-for="item in selectedMetrics" :key="item">
          <ion-col>{{ item }}</ion-col>
          <ion-col>{{ formatPercentage(getMetricValue(companyMetrics?.[item][selectedOption],item)) }}</ion-col>
          <ion-col>{{ formatPercentage(getMetricValue(industryAverages?.[item],item)) }}</ion-col>
          <ion-col>
            {{ formatPercentage(getMetricValue(companyMetrics?.[item][selectedOption],item) - getMetricValue(industryAverages?.[item],item)) }}
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-card-content>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import {formatMetricValue, formatPercentage, getMetricValue} from "@/helpers/metric";
import {
  IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption,

} from "@ionic/vue";
import {companies, customer, getCompanyNameById, getCompanyYears, metrics} from "@/state/Data";
import {greenColor, redColor} from "@/helpers/colors";
export default defineComponent({
  name: "PerformanceKpis",
  methods: {redColor, greenColor},
  props: {
    companyId: {
      required: false,
      type: String
    }
  },
  setup(props) {
    const router = useRouter()
    const yearOptions = getCompanyYears(`${props.companyId}`)
    const selectedOption = ref(yearOptions[0])
    const companyMetrics = computed(
        () => metrics.value?.[props.companyId ?? '??']
    )
    const handleDifference = (item: string) =>
        getMetricValue(companyMetrics?.[item][selectedOption],item) - getMetricValue(industryAverages?.[item],item)
    const positive = "green"
    const negative = "red"

    const selectedMetrics = [
      'CUSTOM_NetSalesGrowth',
      'PLProfitPerGrossmargin',
      'PLProfitPerEBIT',
      'PLProfitPerEBITDA',
      'ReturnRatiosReturnonAssets',
      'FHLongtermSolvencyguar',
      'CapexOverallNetCapexTotaldepreciations',
    ]

    const industryAverages = computed(() => {
      const result: { [key: string]: number } = {}
      ;[
        'CUSTOM_NetSalesGrowth',
        'PLProfitPerGrossmargin',
        'PLProfitPerEBIT',
        'PLProfitPerEBITDA',
        'ReturnRatiosReturnonAssets',
        'FHLongtermSolvencyguar',
        'CapexOverallNetCapexTotaldepreciations',
      ].map((metricName) => {
        let count = 0
        let total = 0
        Object.keys(companies.value ?? {}).map((companyId) => {
          if (companyId !== customer.value?.company_id) {
            if (metrics.value?.[companyId]?.[metricName]?.[selectedOption.value]) {
              total += getMetricValue(
                  metrics.value?.[companyId]?.[metricName]?.[selectedOption.value],
                  metricName
              )
              count++
            }
          }
        })
        result[metricName] = total / count
      })
      return result
    })
    console.log(industryAverages.value?.['CUSTOM_NetSalesGrowth'])
    return {
      formatPercentage,
      formatMetricValue,
      yearOptions,
      selectedOption,
      companyMetrics,
      industryAverages,
      selectedMetrics,
      getCompanyNameById,
      getMetricValue,
      customer,
      positive,
      negative,
      handleDifference,
      handleOnCompanyRowClick: (id: string) =>
          router.replace({ name: 'CompanyDetail', params: { id } }),
    }
  },
  components: {
    IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption
  }
});
</script>

<style>
ion-col {
  border-bottom: 0.1rem solid #e9e9e9;
  word-break: break-word;
}
.green {
  color: var(--green-color);
}
.red {
  color: var(--red-color);
}
ion-col {
  padding: 1rem 0;
}
</style>
