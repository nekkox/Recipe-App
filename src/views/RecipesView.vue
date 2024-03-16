<script setup>
import RecipesList from '@/components/RecipesList.vue'
import { useRatingStore } from '@/stores/rating'


const rating = useRatingStore()

rating.saveRating(66)
rating.saveRating(88)
rating.saveRating({ id: 100, rating: 5 })
rating.saveRating({ id: 2, rating: 100 })
console.log(rating);
console.log(rating.getRatingById(100));
console.log(rating.getRatingById(2));
</script>

<template>
    <h1>RECEPIE VIEW</h1>
<RecipesList />
</template>