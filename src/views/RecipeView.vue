<script setup>
import { useRouter } from "vue-router";
import CookingInstructions from "@/components/CookingInstructions.vue";
const router = useRouter();
const recipeId = Number(router.currentRoute.value.params.id);
</script>

<template>
<CookingInstructions :id="recipeId" :active-panel="1" />
</template>