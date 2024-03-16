<script setup>
import { ref } from 'vue'
import CalendarCard from '@/components/CalendarCard.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'

import { useRecipeInformation } from "@/composables/recipeApi";

import { usePlannerStore } from "@/stores/planner";
const store = usePlannerStore();

import { useCacheStore } from "@/stores/cache";
const cacheStore = useCacheStore();

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


//Generate cards for each day. Using global recipe database from Pinia for each day(comparig dates)
function generateCards(startDate, numberOfDays) {
  const cards = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate)
 
    const content = `Card ${i + 1}`
    //const today = []
    //Flter all recipes stored by Pinia in global table and pick only ones with the same date as the Day table.
    const recipesThisDay = props.recipes.filter((recipe) => {
      
      //reset time to zeros
      const recipeDate = new Date(recipe.date).setHours(0, 0, 0, 0);
      return recipeDate === date.setHours(0, 0, 0, 0);
    })

    cards.push({ date, content, today: recipesThisDay })
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return cards
}

const cards = ref(generateCards(props.date, props.days))

const dialogVisible = ref(false)
const dateSelected = ref(null)


function recipeDialogOpen(card) {
  dateSelected.value = card.date
  console.log(dateSelected.value);
  dialogVisible.value = true
}

function recipeDialogClose() {
  dialogVisible.value = false
  dateSelected.value = null;
}

const preloadRecipe = async (id) => {
  const cacheKey = `recipe-details-${id}`;
  if (!cacheStore.cachedData(cacheKey)) {
    const data = await useRecipeInformation(id.toString())
    cacheStore.cacheData(cacheKey, data);
  }
};

/*
function insertRecipeOnDay(recipe) {
  console.log('SELECTED RECEPE:', recipe);
  //if day with dateSelected exists, then the recipe will be added to that day (into global store)
  if (dateSelected.value) {

    //add picked recipe with day's date to Pania storege
    store.addRecipe({ ...recipe, date: dateSelected.value });

    //upddate card to show added recipe
    cards.value = cards.value.map((card) => {

      //pick card only with the samedateSelected so we can add another recipe to recipe's table
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
*/

const insertRecipeOnDay = (recipe) => {
  if (dateSelected.value) {
    preloadRecipe(recipe.id);
    store.addRecipe({ ...recipe, date: dateSelected.value });
    recipeDialogClose();
  }
};

/*
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

*/
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
          <CalendarCard :card="card" @daySelected="recipeDialogOpen" />
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

