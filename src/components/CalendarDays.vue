<script setup>
import { ref } from 'vue'
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
console.log(cards);
</script>


<template></template>

