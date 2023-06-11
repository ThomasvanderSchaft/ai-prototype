<template>
  <ion-card>
    <ion-card-header>
      <img
        v-if="data?.logo"
        :src="`data:image/png;base64,${data?.logo}`"
        :alt="data?.name"
      />
    </ion-card-header>
    <ion-card-content>
      <ion-grid>
        <ion-row v-for="(value, key, index) in characteristics" :key="index">
          <ion-col>{{ key }}</ion-col>
          <ion-col>{{ value }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

export default defineComponent({
  name: "ProfileCard",
  props: {
    data: {
      required: false,
      type: Object,
    },
  },
  setup(props) {
    const characteristics = {
      Entity: props?.data?.legal_entity,
      Country: props?.data?.address?.country,
      Website: props?.data?.website,
      "Value chain": props?.data?.food?.value_chain,
      "Value chain link": props?.data?.food?.value_chain_link_primary,
      "Product category": props?.data?.food?.product_category_primary,
      "Product group": props?.data?.food?.product_group_primary,
    };
    return {
      characteristics,
    };
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  },
});
</script>
