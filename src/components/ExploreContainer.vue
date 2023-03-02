<template>
  <div class="explore-container">Sup: {{ name }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExploreContainer",
  props: { name: { type: String, required: true } },
});
</script>

<style lang="scss" scoped>
.explore-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
