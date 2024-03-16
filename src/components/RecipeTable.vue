<script setup>
const props = defineProps(['recipes', 'title'])
const emits = defineEmits(["openPreview"]);

const openPreview = (recipe) => {
    emits("openPreview", recipe);
};
</script>

<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="recipe in props.recipes" :key="recipe.id">
                <td class="py-4">
                    <v-sheet class="d-flex justify-space-between">
                        <v-sheet class="ma-2 pa-2">
                            <h2 class="text-h4">{{ recipe.title }}</h2>
                            
                        </v-sheet>
                        <v-sheet class="ma-2 pa-2">
                            <v-btn @click="openPreview(recipe)" text-color="light-green" icon="mdi-book-open"></v-btn>
                        </v-sheet>
                    </v-sheet>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>