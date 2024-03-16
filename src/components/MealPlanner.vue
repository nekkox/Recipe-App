<script setup>
import CalendarDays from '@/components/CalendarDays.vue'
import { storeToRefs } from "pinia";

import { usePlannerStore } from "@/stores/planner";
const store = usePlannerStore();
const { recipes } = storeToRefs(store);

console.log('recipies:', store);
console.log('recipies2:', recipes);



</script>

<template>
    <CalendarDays :days="7" 
    :date="new Date()"
    :recipes="recipes"
    :key="`recipes-${recipes.length}`"
    >

    </CalendarDays>
   
</template>