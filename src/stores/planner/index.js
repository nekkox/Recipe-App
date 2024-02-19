import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

export const usePlannerStore = defineStore('planner', () => {
  const recipes = ref(useLocalStorage('planner', []))

  function addRecipe(recipe) {
    recipes.value.push(recipe)
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
  return { recipes, addRecipe, removeRecipeByIdDate }
})
