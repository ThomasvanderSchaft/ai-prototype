<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>MORE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Other pages</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="This page will show all other pages as a list" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>
