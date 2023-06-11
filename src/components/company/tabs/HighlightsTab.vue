<template>
  <PerformanceKpis :companyId="companyId"/>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PerformanceKpis from "@/components/company/PerformanceKpis.vue";
export default defineComponent({
  name: "HighlightsTab",
  components: {
    PerformanceKpis
  },
  props: {
    companyId: {
      required: false,
      type: String
    }
  },
});
</script>