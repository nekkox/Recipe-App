import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ()=>import('@/layouts/default/Default.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: ()=> import('@/views/HomeView.vue') 
        },
        {
          path: 'recipes',
          name: 'recipes',
          component: ()=> import('@/views/RecipesView.vue') 
        },
        {
          path: '/recipe/:id',
          name: 'recipe',
          component: () => import('@/views/RecipeView.vue')
          }
      ]
    },
  ]
})

export default router
