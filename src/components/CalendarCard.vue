<script setup>
import { useFormatDate } from '@/composables/formatters'
import AppLink from '@/components/AppLink.vue'
import {usePlannerStore} from '@/stores/planner/index'
const store = usePlannerStore();

const props = defineProps(['card'])
//const emits = defineEmits(['daySelected', "recipeRemoved"])
const emits = defineEmits(['daySelected'])

//emiting to the CalendarDays which card has been selected by clicking a button
function addRecipeToDay(card) {
    emits('daySelected', card)
}

//emiting to the CalendarDays which recipe has been selected for removing by clicking a button
/*
function recipeRemoved(recipe, date) {
    emits("recipeRemoved", recipe, date);
}
*/

function removeFromDay(recipe){
    const { id, date } = recipe;
    store.removeRecipeByIdDate({ id, date });
    console.log('Recipe removed: ', id, ' - ', date );
}
</script>

<template>
    <v-sheet class="d-flex justify-space-between">
        <v-sheet class="ma-2 pa-2">
            <h2 class="text-h5">{{ useFormatDate(card.date) }}</h2>
        </v-sheet>
        <v-sheet class="ma-2 pa-2">
            <v-btn text icon="mdi-plus" color="blue" width="25" height="25" @click="addRecipeToDay(card)"></v-btn>
        </v-sheet>
    </v-sheet>


    <v-col>
        <v-card v-for="today in card.today" :key="today.id" class="my-4">
            <v-card-title>
                <AppLink :to='`/recipe/${today.id}`'>{{ today.title }}</AppLink>
            </v-card-title>
            <v-img width="200" :src=today.image></v-img>
            <v-card-actions>
                <v-spacer></v-spacer>{{  console.log('TEST: ', today.id, card.date ) }} 
                <v-btn text icon="mdi-trash-can-outline" color="red" width="25" height="25"
                    @click="removeFromDay({id: today.id, date: card.date})"></v-btn>

            </v-card-actions>
        </v-card>
    </v-col>


    <!--
        <v-col>
            <v-sheet v-if="card.today">
                <div v-for="(rec, index) in card.today" :key="index" style="display: inline-flex;">
                    <div style="margin-right: 25px;">
                        Przepis: {{ rec.title }}
                        <v-img width="200" :src=rec.image></v-img>
                    </div>
                </div>
            </v-sheet>
        </v-col>
   --->
</template>