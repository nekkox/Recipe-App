<script setup>
import { ref, onMounted } from "vue";
import { useRecipeInformation } from "@/composables/recipeApi"
import { useCacheStore } from "@/stores/cache/index.js";
import AppLoader from "@/components/AppLoader.vue"

const store = useCacheStore();

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
const panel = ref('instructions')

onMounted(() => {
    getRecipeDetails(props.id);
});

async function getRecipeDetails(id) {
    const data = await useRecipeInformation(id.toString())
    console.log(data);
    recipe.value = data
}

</script>

<template>
    <AppLoader v-if="!recipe" />
    <v-container v-else fluid>
        <v-col>
            <v-img height="200" :src="recipe.image" cover v-if="recipe.image" />
            <h1 class="text-h3 ma-4">{{ recipe.title }}</h1>
            <v-chip class="ma-2 my-4" color="primary" v-for="cuisine in recipe.cuisines" :key="cuisine">
                {{ cuisine }}
            </v-chip>
            <v-expansion-panels variant="accordion" v-model="panel">
                <v-expansion-panel value="summary">
                    <v-expansion-panel-title class="text-h5">Summary</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div v-html="recipe.summary" class="text-body-1"></div>
                    </v-expansion-panel-text>
                </v-expansion-panel>

                <v-expansion-panel value="instructions">
                    <v-expansion-panel-title class="text-h5">Instructions</v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div v-html="recipe.instructions" class="text-body-1"></div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-container>
</template>