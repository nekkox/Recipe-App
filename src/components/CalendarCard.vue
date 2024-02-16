<script setup>
import { useFormatDate } from '@/composables/formatters'

const props = defineProps(['card'])
</script>

<template>
    <v-sheet class="d-flex justify-space-betwee">
        <v-sheet class="ma-2 pa-2">
            <h2 class="text-h5">{{ useFormatDate(props.card.date) }}</h2>
        </v-sheet>
    </v-sheet>
</template>