<template>
  <v-container>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="n in 8" :key="n" cols="3">
          <v-sheet color="surface-variant-alt" height=" 200"> </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
