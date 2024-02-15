<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
<v-layout >
  <v-container class="main">
    <main>
    
      <RouterView />
    
    </main>
  </v-container>
  <v-footer app>
    <span>Meal Planner</span>&nbsp;- &copy;
    {{ new Date().getFullYear() }}
  </v-footer>
</v-layout>
</template>

<style scoped>

</style>
