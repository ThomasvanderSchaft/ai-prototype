<template>
  <div>
    <ion-card :id="`${name}-wrapper`">
      <ion-card-header>
        <ion-card-title color="primary">Net Sales</ion-card-title>
      </ion-card-header>
      <MixedChart
        v-if="type === 'mixed'"
        :datasets="datasets"
        :visual="visual"
        :axes="axes"
        :xAxisGrouping="xAxisGrouping"
        :companyId="companyId"
        ref="mixedChart"
        :name="name"
        class="chart"
        :numberFormatting="numberFormatting"
        :sizeIndicator="sizeIndicator"
        :referenceLine="referenceLine"
      />
    </ion-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import MixedChart, { MixedChartDatasetType } from './MixedChart.vue'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";

export interface VisualSettings {
  legend?: boolean
  aspectRatio?: number
  line?: {
    tension?: number
  }
  bar?: {
    width: number
  }
}

export type AutomaticDatasetType =
    | 'companyYears'
    | 'companySpecialMetric'
    | 'bubbleCompanies'

export default defineComponent({
  name: 'Chart',
  props: {
    // Name of the chart for unique identification + export
    name: { type: String, required: true },
    // (Visual) label for the chart
    title: { type: String, required: false },
    visual: { type: Object as PropType<VisualSettings>, required: false },
    numberFormatting: {
      type: String as PropType<'k' | 'm' | 'b' | 'auto'>,
      default: 'auto',
      required: false,
    },
    sizeIndicator: { type: String, required: false },
    hint: { type: String, required: false },

    // Chart settings
    type: {
      type: String as PropType<'mixed' | 'bubble'>,
      required: false,
      default: 'mixed',
    },
    datasets: {
      required: false,
      type: Array as PropType<MixedChartDatasetType[]>,
    },

    companyId: {
      required: false,
      type: String
    },

    // Mixed chart
    axes: { type: Object as PropType<AxisType>, required: false },
    xAxisGrouping: {
      type: String as PropType<'year' | 'dataset'>,
      required: false,
      default: 'year',
    },
    // Render a reference line
    referenceLine: {
      type: Function as PropType<
          () => { title?: string; value: number; color?: string }
      >,
      required: false,
    },

    // Global
    actions: {
      type: Array as PropType<('exportImg' | 'exportCSV' | 'fullscreen')[]>,
      required: false,
    },
    // Function that evaluates the dataset color
    getDatasetColor: { type: Function, required: false },
    hideLegend: { type: Boolean, required: false },
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    MixedChart,
  },
})

export interface AxisType {
  x?: { label?: string }
  y?: { label?: string; position?: 'left' | 'right' }
  y1?: { label?: string; position?: 'left' | 'right' }
}
</script>
<style lang="scss" scoped>
.chartWrapper {
  height: 31.25rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: stretch;
  padding: 0;
  .header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    .user-actions {
      margin-right: calc(var(--container-gap) / 2);
    }
    .title {
      display: flex;
      flex: 1;
      .hint {
        font-size: 1rem;
        display: flex;
        align-items: center;
      }
    }
    .actions {
      width: 7.5rem;
      text-align: right;
      display: flex;
      gap: 1rem;
      opacity: 0.3;
      transition: all 0.3s ease-in-out;

      svg {
        width: 1rem;
        color: var(--light-grey);
        transition: all 0.1s ease-in-out;
      }
    }
  }

  // Actions, but on hover of the card
  &:hover {
    .actions {
      opacity: 1;
      svg {
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .chart {
    height: calc(100% - 3rem);
  }
}
.fullscreen {
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-color: white;

  .closeFullScreen {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
  }

  .actions {
    position: absolute !important;
    top: 1.5rem !important;
    right: 14rem !important;
    opacity: 1 !important;
    gap: 3rem !important;
  }

  .mixed-chart {
    min-height: 80vh;
    background-color: white;
  }
}
</style>
