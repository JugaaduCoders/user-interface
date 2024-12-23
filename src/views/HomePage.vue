<template>
  <v-container>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="n in 8" :key="n" cols="3">
          <v-sheet height="200" :class="themeClass" elevation="4"> </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useThemeStore } from "@/store/useThemeStore";
import { computed } from "vue";

const themeStore = useThemeStore();

const themeClass = computed(() => {
  return themeStore.isDark ? "bg-dark" : "bg-light";
});
</script>
