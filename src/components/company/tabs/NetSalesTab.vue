<template>
  <Chart
      name="net-sales"
      title="Net sales"
      :datasets="[
        {
          label: 'Net sales',
          type: 'companyMetricDevelopment',
          metric: 'PLIncomeNetsales',
          company: companyId,
        },
      ]"
      :visual="{ line: { tension: 0.3 }, bar: { width: 0.7 } }"
      :axes="{ y1: { label: 'Net sales', position: 'right' } }"
      :number-formatting="formatLargeNumberAs"
      :companyId="companyId"
  />
  <Chart
      name="net-sales-per-fte"
      title="Net Sales per FTE"
      :datasets="[
        {
          label: 'Net sales per FTE',
          type: 'companyMetricDevelopment',
          metric: 'PLIncomeNetsalesFTE',
          company: companyId,
        },
      ]"
      :visual="{ line: { tension: 0.3 }, bar: { width: 0.7 } }"
      :axes="{ y1: { label: 'Net sales per FTE', position: 'right' } }"
      :number-formatting="formatLargeNumberAs"
      :companyId="companyId"
  />
</template>
<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {getCompanyNameById} from "@/state/Data";
import Chart from "@/components/chart/Chart.vue";

export default defineComponent({
  name: "NetSalesTab",
  components: {
    Chart
  },
  props: {
    companyId: {
      required: false,
      type: String
    }
  },
  setup(props) {
    const formatLargeNumberAs = ref<'k' | 'b' | 'm'>('m')
    const datasets = computed(() => {
      const addCustomerCompany =
          getCompanyNameById(props.companyId) && false

      const result = {}
      ;[
        'PLIncomeNetsales',
        'PLIncomeNetsalesFTE',
        'PLProfitPerGrossmargin',
        'PLProfitEBIT',
        'PLProfitPerEBIT',
        'PLProfitEBITDA',
        'PLProfitPerEBITDA',
        'ReturnRatiosReturnonAssets',
        'CFSOperOperationalcashflowCalc',
        'CapexOverallNetCapexTotaldepreciations',
      ].map((metricName) => {
        result[metricName] = addCustomerCompany
            ? [
              {
                label: addCustomerCompany,
                type: 'companyMetricDevelopment',
                metric: metricName,
                company: props.companyId,
                colorScheme: 'timescale-customer',
                hideNulls: true,
              },
            ]
            : []
      })
      return result
    })
    return { formatLargeNumberAs, datasets  }
  }
});
</script>