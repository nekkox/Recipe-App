<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DefaultBar from '@/layouts/default/AppBar.vue'


</script>

<template>
  <v-app theme="dark">

    <DefaultBar />

    <v-main>
      <v-container>
      <RouterView />
    </v-container>
    </v-main>

    <v-footer app>
      <span>Meal Planner</span>&nbsp;- &copy;
      {{ new Date().getFullYear() }}
    </v-footer>
  </v-app>
</template>

<style scoped></style>
