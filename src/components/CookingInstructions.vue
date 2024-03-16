<script setup>
import { ref, onMounted } from "vue";
import { useRecipeInformation } from "@/composables/recipeApi"
import { useCacheStore } from "@/stores/cache/index.js";
import AppLoader from "@/components/AppLoader.vue"
import RecipeRating from "./RecipeRating.vue";

const store = useCacheStore();

console.log('CACHE', store);

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
const panel = ref(props.activePanel)


async function getRecipeDetails(id) {

    const cacheKey = `recipe-details-${props.id}`;

    if (store.cachedData(cacheKey)) {
        recipe.value = store.cachedData(cacheKey)
        console.log('Cached:', recipe.value);
    } else {
        const data = await useRecipeInformation(id.toString())
        console.log('NOT cached:', data);
        store.cacheData(cacheKey, data);
        recipe.value = data
    }
}

onMounted(() => {
    getRecipeDetails(props.id);
    console.log('INFO', recipe);
    console.log('ALL:', store.getAllCachedData());
});

</script>

<template>
    <AppLoader v-if="!recipe" />
    <v-container v-else fluid>
        <v-col>
            <v-img height="200" :src="recipe.image" cover v-if="recipe.image" />
            <h1 class="text-h3 ma-4">{{ recipe.title }}</h1>
            <p>Minutes {{ recipe.readyInMinutes }}</p>

            <RecipeRating :id="recipe.id" />

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