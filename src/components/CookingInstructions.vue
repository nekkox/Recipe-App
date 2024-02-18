<script setup>
import { ref, onMounted } from "vue";
import { useRecipeInformation } from "@/composables/recipeApi"
import AppLoader from "@/components/AppLoader.vue"

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    activePanel: {
        type: Number,
        default: 0
    }
})

const recipe = ref(null)
const panel = ref(null)

onMounted(() => {
    getRecipeDetails(props.activePanel);
});

async function getRecipeDetails(id) {
    const data = await useRecipeInformation(id.toString())
    recipe.value = data
}

</script>

<template>

<AppLoader v-if="!recipe" />

</template>