<script setup>
import { ref } from 'vue'
import Card from '@/components/CalendarCard.vue'

const props = defineProps({
  date: {
    type: Date,
    required: true
  },
  days: {
    type: Number,
    required: true,
    default: 7
  }
})

const dialogVisible = ref(false)
const dateSelected = ref(null)

function generateCards(startDate, numberOfDays) {
  const cards = []
  const currentDate = new Date(startDate)

  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(currentDate.getTime())
    const content = `Card ${i + 1}`
    cards.push({ date, content })
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return cards
}

const cards = ref(generateCards(props.date, props.days))


function recipeDialogOpen(card) {
  dateSelected.value = card.date
  dialogVisible.value = true
}

function recipeDialogClose() {
  dialogVisible.value = false
}
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
          <Card :card="card" @day-selected="recipeDialogOpen"></Card>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-dialog v-model="dialogVisible" scrollable>
    <v-card>
      <v-card-title>Search for a recipe to add to this day</v-card-title>
      <v-card-actions>
        <v-btn color="primary" block @click="recipeDialogClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

