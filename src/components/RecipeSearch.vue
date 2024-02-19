<script setup>
import { ref, watch } from 'vue';
import { useRecipeSearch } from '@/composables/recipeApi'

const emits = defineEmits(['recipeSelected'])

const searchQuery = ref('')
const searchResults = ref([])
let timeout = null


//Watch searchQuery and when it changes debouncedSearch function is run to get search results
watch(searchQuery, () => debouncedSearch())

function debouncedSearch() {
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
        getSearchResults()
    }, 500)
}

//Getting results from api
async function getSearchResults() {
    const result = await useRecipeSearch(searchQuery.value)
    console.log(result);
    searchResults.value = result.results
}


function recipeSelected(result) {
    emits('recipeSelected', result)
}

</script>

<template>
    <v-card>
        <v-card-text>
            <v-text-field v-model="searchQuery" label="Search">
            </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-list v-if="searchResults">
            <v-list-item v-for="(result, index) in searchResults" :key="index">
                <v-list-item-title @click="recipeSelected(result)">{{ result.title }}</v-list-item-title>
            </v-list-item>
        </v-list>

    </v-card>
</template>

<style scoped>
.list-item {
    cursor: pointer;
}

.list-item:hover,
.list-item:active {
    text-decoration: underline;
}
</style>