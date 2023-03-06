<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title color="primary">{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <ion-row class="head">
          <ion-col>Company</ion-col>
          <ion-col>EBIT</ion-col>
          <ion-col>Net sales Growth</ion-col>
        </ion-row>
        <ion-row
            v-for="company in companies"
            :key="company.id"
            @click="handleOnCompanyRowClick(company.id)"
        >
          <ion-col>{{ company.name }}</ion-col>
          <ion-col :class="{ red: company.result < 0 }">{{ formatPercentage(company.result) }}</ion-col>
          <ion-col :class="{green: company.net_sales_growth > 0, red: company.net_sales_growth < 0}">
            {{ formatPercentage(company.net_sales_growth) }}
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {formatMetricValue, formatPercentage} from "@/helpers/metric";
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol

} from "@ionic/vue";
export default defineComponent({
  name: "PerformerTable",
  props: {
    title: { required: false, type: String },
    companies: { required: false, type: Object },
  },
  setup() {
    const router = useRouter()
    return {
      formatPercentage,
      formatMetricValue,
      handleOnCompanyRowClick: (id: string) =>
          router.push({ name: 'Company-detail-highlights', params: { id } }),
    }
  },
  components: {
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol
  }
});
</script>

<style>
  .head {
    border-bottom: 0.1rem solid #777777;
    font-weight: bold;
  }
  ion-col {
    border-bottom: 0.1rem solid #e9e9e9;
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
