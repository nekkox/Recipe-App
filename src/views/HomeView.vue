<script setup>
import MealPlanner  from '@/components/MealPlanner.vue'
import {useRecepeApi, useRecipeInformation} from '@/composables/recipeApi.js'
import { onMounted } from 'vue';

async function results(){
   const response = await useRecepeApi('recipes/716429/information')
   console.log(response);
}

async function info(id){
   const response = await useRecipeInformation(id)
   console.log(response);
}

//console.log(await response);
onMounted(()=>{
   results()
   info(716430)
})

</script>

<template>
 
   <h1>hello</h1>
   <MealPlanner>

   </MealPlanner>

</template>
