<template>
    <v-main>
      <router-view />
      <MealPlanner>
        
      </MealPlanner>
    </v-main>
  </template>
  
  <script setup>
 import MealPlanner  from '@/components/MealPlanner.vue'
  </script>