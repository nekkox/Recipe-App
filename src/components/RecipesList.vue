<script setup>
import { ref, computed, onMounted } from "vue";

import RecipeTable from '@/components/RecipeTable.vue'

// return a date in the future:
function addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

// generate some mock data for now:
const recipes = [
    { id: 1, title: "test", date: addDays(1) },
    { id: 2, title: "test2", date: addDays(1) },
    { id: 2, title: "test3", date: addDays(-1) },
];

function openPreview(recipe) {
    console.log(`opening recipe ${recipe.title}`);
}

const pastRecipes = computed(() =>
    recipes.filter((recipe) => {
        const date = new Date(recipe.date);
        return date < new Date();
    })
);

const futureRecipes = computed(
    () =>
        recipes.filter((recipe) => {
            const date = new Date(recipe.date);
            return date >= new Date();
        })
);

const tab = ref("upcoming");

onMounted(() => {
    if (futureRecipes.value.length === 0) {
        tab.value = "past";
    }
});
console.log(pastRecipes);
</script>

<template>
    <div v-if="pastRecipes.length === 0 && futureRecipes.length === 0">
        No recipes yet. Add some to your planner!
    </div>
    <div v-if="true">
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
    </div>
</template>