<template>
  <v-container>
    <v-row dense v-if="loading">
      <v-col v-for="n in 12" :key="n" cols="3">
        <v-skeleton-loader
          type="image"
          class="mb-4"
          height="200"
        ></v-skeleton-loader>
        <v-skeleton-loader
          type="text"
          class="mt-1"
          :lines="2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row dense v-else>
      <v-col v-for="hackathon in hackathons" :key="hackathon.id" cols="3">
        <v-sheet
          height="200"
          :class="themeClass"
          elevation="4"
          class="d-flex flex-column align-center justify-center"
        >
          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          ></v-img>
          <div class="text-center">
            <h3 class="text-h6">{{ hackathon.name }}</h3>
            <p class="text-body-2">{{ formattedDate(hackathon.startDate) }}</p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/useThemeStore";
import { Hackathon } from "@/types";
import { requestHandler } from "@/utils/request";
import { computed, onMounted, ref } from "vue";

const hackathons = ref<Hackathon[]>([]);
const loading = ref(true);

onMounted(async () => {
  const res = await requestHandler<Hackathon[]>("GET", "/api/hackathon");
  if (res.success) {
    hackathons.value = res.payload;
  } else {
    console.error("Failed to fetch hackathons");
  }
  loading.value = false;
});

const themeStore = useThemeStore();

const themeClass = computed(() => {
  return themeStore.isDark ? "bg-dark" : "bg-light";
});

const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.v-skeleton-loader {
  border-radius: 8px;
}
</style>
