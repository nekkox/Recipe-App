import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'


export const useRatingStore = defineStore('rating', () => {
    const ratings = ref(useLocalStorage('rating', []));
   // const ratings = ref([])
console.log(ratings);
    const getRatingById = (id) => {
        const rating = ratings.value.find((rating) => rating.id === id);
        return rating ? rating.rating : undefined;
    };

    const saveRating = (rating={}) => {
        const ratingIndex = ratings.value.findIndex((r) => r.id === rating.id);
        if (ratingIndex === -1) {
            ratings.value.push(rating);
        } else {
            ratings.value[ratingIndex] = rating;
        }
    };

    return { getRatingById, saveRating };
});