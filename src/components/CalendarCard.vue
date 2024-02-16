<script setup>
import { useFormatDate } from '@/composables/formatters'

const props = defineProps(['card'])

const emits = defineEmits(['daySelected'])

function addRecipeToDay(card) {
    emits('daySelected', card)
    console.log('ff', card);
}
</script>

<template>
    <v-sheet class="d-flex justify-space-betwee">
        <v-sheet class="ma-2 pa-2">
            <h2 class="text-h5">{{ useFormatDate(props.card.date) }}</h2>
        </v-sheet>

        <v-sheet class="ma-2 pa-2">
            <v-btn text icon="mdi-plus" color="red" @click="addRecipeToDay(card)"></v-btn>
        </v-sheet>

    </v-sheet>
</template>