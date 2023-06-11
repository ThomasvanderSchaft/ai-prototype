<template>
  <ion-card>
    <ion-segment :scrollable="true" v-model="selectedSegment">
      <ion-segment-button value="highlights">
        <ion-label>Highlights</ion-label>
      </ion-segment-button>
      <ion-segment-button value="news">
        <ion-label>News</ion-label>
      </ion-segment-button>
      <ion-segment-button value="net-sales">
        <ion-label>Net sales</ion-label>
      </ion-segment-button>
      <ion-segment-button value="profitability">
        <ion-label>Profitability</ion-label>
      </ion-segment-button>
      <ion-segment-button value="returns">
        <ion-label>Returns</ion-label>
      </ion-segment-button>
      <ion-segment-button value="investments">
        <ion-label>Investments</ion-label>
      </ion-segment-button>
      <ion-segment-button value="financial-health">
        <ion-label>Financial Health</ion-label>
      </ion-segment-button>
      <ion-segment-button value="concern">
        <ion-label>Concern</ion-label>
      </ion-segment-button>
      <ion-segment-button value="key-ratios">
        <ion-label>Key Ratios</ion-label>
      </ion-segment-button>
      <ion-segment-button value="reports">
        <ion-label>Reports</ion-label>
      </ion-segment-button>
    </ion-segment>
    <component v-bind:is="segments[selectedSegment]" :companyId="companyId"></component>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue';

export default defineComponent({
  components: {
    IonCard, IonSegment, IonSegmentButton, IonLabel,
    HighlightsTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/HighlightsTab.vue')
    ),
    NewsTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/NewsTab.vue')
    ),
    NetSalesTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/NetSalesTab.vue')
    ),
    ProfitabilityTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/ProfitabilityTab.vue')
    ),
    ReturnsTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/ReturnsTab.vue')
    ),
    InvestmentsTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/InvestmentsTab.vue')
    ),
    FinancialHealthTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/FinancialHealthTab.vue')
    ),
    ConcernTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/ConcernTab.vue')
    ),
    KeyRatiosTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/KeyRatiosTab.vue')
    ),
    ReportsTab: defineAsyncComponent(() =>
        import('@/components/company/tabs/ReportsTab.vue')
    ),
  },
  props: {
    companyId: {
      type: String,
      required: false
    }
  },
  setup() {
    const selectedSegment = ref<string>()
    const segments = {
      "highlights": "HighlightsTab",
      "news": "NewsTab",
      "net-sales": "NetSalesTab",
      "profitability": "ProfitabilityTab",
      "returns": "ReturnsTab",
      "investments": "InvestmentsTab",
      "financial-health": "FinancialHealthTab",
      "concern": "ConcernTab",
      "key-ratios": "KeyRatiosTab",
      "reports": "ReportsTab",
    }
    onMounted(() => {
      selectedSegment.value = "highlights"
    })
    return {
      selectedSegment,
      segments
    }
  },
});
</script>