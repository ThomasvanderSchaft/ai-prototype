<template>
      <PerformerTable title="Top 5 performers" :companies="topPerformers"></PerformerTable>
      <PerformerTable title="Bottom 5 performers" :companies="bottomPerformers"></PerformerTable>
</template>
<script lang="ts">
import { useDataState } from '@/state/Data'
import { computed, defineComponent } from 'vue'
import {
  getMetricValue,
} from '@/helpers/metric'
import { orderBy } from 'lodash'
import PerformerTable from "@/components/performers/PerformerTable.vue";

export default defineComponent({
  name: 'Home',
  components: {
    PerformerTable
  },
  setup() {
    const {
      customer,
      companies,
      metrics,
      fiftyFivePercentYear,
    } = useDataState()
    // Top 5 performers
    const sortedPerformers = computed(() => {
      const performersList: {
        name: string
        id: string
        value_chain_link?: string
        result: number
        net_sales_growth: number
        is_peer: boolean
      }[] = []

      Object.keys(companies.value ?? {}).map((companyId) => {
        const company = companies.value?.[companyId]
        const customerCompany = customer.value?.companies?.[companyId]
        const companyMetrics = metrics.value?.[companyId]
        if (
            companyMetrics?.['PLIncomeNetSalesGrowthCalc']?.[
                fiftyFivePercentYear.value
                ] &&
            companyMetrics?.['PLProfitPerEBIT']?.[fiftyFivePercentYear.value]
        ) {
          performersList.push({
            name: company?.display_name ?? '??',
            id: companyId,
            value_chain_link: company?.food?.value_chain_link_primary,
            result: getMetricValue(
                companyMetrics?.['PLProfitPerEBIT']?.[fiftyFivePercentYear.value],'PLProfitPerEBIT'
            ),
            net_sales_growth: getMetricValue(
                companyMetrics?.['PLIncomeNetSalesGrowthCalc']?.[
                    fiftyFivePercentYear.value
                    ],
                'PLIncomeNetSalesGrowthCalc'
            ),
            is_peer: !!customerCompany?.peer,
          })
        }
      })
      return performersList
    })
    const topPerformers = computed(() =>
        orderBy(sortedPerformers.value, (o) => o.result, 'desc').slice(0, 5)
    )
    const bottomPerformers = computed(() =>
        orderBy(sortedPerformers.value, (o) => o.result, 'asc').slice(0, 5)
    )

    return {
      peerGroupIds: computed(() =>
          Object.keys(customer.value?.companies ?? {})?.filter(
              (companyId) =>
                  customer.value?.companies?.[companyId]?.peer &&
                  companyId !== customer.value?.company_id
          )
      ),
      topPerformers,
      bottomPerformers,
      customerCompanyId: computed(() => customer.value?.company_id),
    }
  },
})
</script>


