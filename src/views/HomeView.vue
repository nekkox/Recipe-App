<script setup>
import MealPlanner  from '@/components/MealPlanner.vue'
import {useRecepeApi} from '@/composables/recipeApi.js'
import { onMounted } from 'vue';

async function results(){
   const response = await useRecepeApi('recipes/716429/information')
   console.log(response);
}

//console.log(await response);
onMounted(()=>{
   results()
})

</script>

<template>
 
   <h1>hello</h1>
   <MealPlanner>

   </MealPlanner>

</template>
