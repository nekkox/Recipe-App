<script setup>
import { ref } from 'vue'
import CalendarCard from '@/components/CalendarCard.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'

import { usePlannerStore } from "@/stores/planner";
const store = usePlannerStore();

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
  days: {
    type: Number,
    required: true,
    default: 7
  },
  recipes: {
    type: Array,
    required: false,
    value: [],
  },
})



const dialogVisible = ref(false)
const dateSelected = ref(null)

function generateCards(startDate, numberOfDays) {
  const cards = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate)
 
  
    const content = `Card ${i + 1}`
    const today = []
    //Flter all reciped and pick only ones with the same date.
    const recipesThisDay = props.recipes.filter((recipe) => {
      const recipeDate = new Date(recipe.date).setHours(0, 0, 0, 0);
      return recipeDate === date.setHours(0, 0, 0, 0);
    })

    cards.push({ date, content, today: recipesThisDay })
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return cards
}

const cards = ref(generateCards(props.date, props.days))


function recipeDialogOpen(card) {
  dateSelected.value = card.date
  console.log(dateSelected.value);
  dialogVisible.value = true
}

function recipeDialogClose() {
  dialogVisible.value = false
}

function insertRecipeOnDay(recipe) {
  if (dateSelected.value) {
    store.addRecipe({ ...recipe, date: dateSelected.value });
    cards.value = cards.value.map((card) => {
      if (card.date.getTime() === dateSelected.value.getTime()) {

        let result = { ...card, today: [...card.today, recipe] }
        console.log('result', result);
        return result
      }

      return card;
    })
    recipeDialogClose()
  }
}

function removeRecipeFromDay(recipe, date) {
  cards.value = cards.value.map((card) => {
    if (card.date.getTime() === date.getTime()) {
      return {
        ...card,
        today: card.today.filter((today) => today.id !== recipe.id),
      };
    }
    return card;
  });
};
</script>


<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Upcoming days</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in cards" :key="card.date.toString()">
        <td class="py-4">
          <CalendarCard :card="card" @daySelected="recipeDialogOpen" @recipeRemoved="removeRecipeFromDay"></CalendarCard>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-dialog v-model="dialogVisible" scrollable>
    <v-card>
      <v-card-title>Search for a recipe to add to this day</v-card-title>
      <RecipeSearch @recipeSelected="insertRecipeOnDay" />
      <v-card-actions>
        <v-btn color="primary" block @click="recipeDialogClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

