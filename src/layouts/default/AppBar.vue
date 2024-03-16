<script setup >
import AppLink from '@/components/AppLink.vue'
import { ref } from 'vue';

</script>
<template>
  <v-app-bar flat>
    <v-btn id="hamburger-activator" icon="mdi-menu"></v-btn>
<v-menu activator="#hamburger-activator">
  
  <v-list>
        <v-list-item>
          <v-btn flat block><app-link to="/">Home</app-link></v-btn>
          <v-btn flat block
            ><app-link to="/recipes">Recipes</app-link></v-btn
          >
        </v-list-item>
      </v-list>
</v-menu>

    <v-app-bar-title>
      <v-icon icon="mdi-silverware-variant" color="red" />
      Meal planner
    </v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>
a{
  text-decoration: none;
  color: azure;
 
}

</style>