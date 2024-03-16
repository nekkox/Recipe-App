<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePlannerStore } from "@/stores/planner";
const store = usePlannerStore();


import RecipeTable from '@/components/RecipeTable.vue'
import CookingInstructions from "./CookingInstructions.vue";
import AppLink from "./AppLink.vue";

//Getting only pastRecipes and futureRecipes from PlannerStore
const { pastRecipes, futureRecipes } = storeToRefs(store);

const dialogVisible = ref(false)
const selectedRecipe = ref(null)

function openPreview(recipe) {
    console.log(`opening recipe ${recipe.title}`);
    console.log(recipe);
    selectedRecipe.value = recipe;
    dialogVisible.value = true;
}

const tab = ref("upcoming");


onMounted(() => {
    if (futureRecipes.value.length === 0) {
        tab.value = "past";
    }
});

</script>

<template>
    <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
        No recipes yet. Add some to your planner!
    </div>

    <div v-else>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="past" :disabled="pastRecipes.length === 0">Past</v-tab>
            <v-tab value="upcoming" :disabled="futureRecipes.length === 0">Upcoming</v-tab>
        </v-tabs>

        <v-window v-model="tab" direction="vertical">
            <v-window-item key="past" value="past">
                <RecipeTable :recipes="pastRecipes" title="Past recipes" removable @openPreview="openPreview" />
            </v-window-item>
            <v-window-item key="upcoming" value="upcoming">
                <RecipeTable :recipes="futureRecipes" title="Upcoming recipes" @openPreview="openPreview" />
            </v-window-item>
        </v-window>

        <v-dialog v-model="dialogVisible" class="dialog" scrollable>
            <v-card v-if="selectedRecipe">
                <cooking-instructions :id="selectedRecipe.id" />
                <v-card-actions>
                    <v-btn text>
                        <app-link :to="`/recipe/${selectedRecipe.id}`">Cooking instructions</app-link></v-btn>
                    <v-spacer />
                    <v-btn @click="dialogVisible = false" icon="mdi-close"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>