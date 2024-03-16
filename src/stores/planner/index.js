//ok

import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'

export const usePlannerStore = defineStore('planner', () => {
  const recipes = ref(useLocalStorage('planner', []))



  function recipesSortedByDate() {
   return recipes.value.sort((a, b) => (new Date(a.date).getTime() < new Date(b.date).getTime() ? -1 : 1))
  }

  const pastRecipes = computed(() => {
    const sorted = recipesSortedByDate()
    return sorted.filter((recipe) => {
      const date = new Date(recipe.date)
      return date < new Date()
    })
  })

  const futureRecipes = computed(() => {
    const sorted = recipesSortedByDate()
    return sorted.filter((recipe) => {
      const date = new Date(recipe.date)
      return date >= new Date()
    })
  })

  function addRecipe(recipe) {
    recipes.value.push(recipe)
    console.log('Adding recepe: ', recipe)
    console.log('sorting')
    console.log('RECIPES:', recipes.value);
    console.log(recipesSortedByDate());
    recipesSortedByDate()
  }

  const removeRecipeByIdDate = (options) => {
    const { id, date } = options
    const recipeIndex = recipes.value.findIndex(
      (recipe) =>
        recipe.id === id &&
        new Date(recipe.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)
    )
    recipes.value.splice(recipeIndex, 1)
  }

  return { recipes, addRecipe, removeRecipeByIdDate, pastRecipes, futureRecipes }
})
