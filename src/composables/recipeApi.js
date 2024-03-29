const apiKey = import.meta.env.VITE_APP_SPOONACULAR_API
const RECIPE_API = 'https://api.spoonacular.com'
const API_SIGN = `apiKey=${apiKey}`

function getQuery(query) {
  return query ? `&query=${query}` : ''
}

function getRequestURI(path, query) {
  const apiPath = `${RECIPE_API}/${path}`
  return `${apiPath}?${API_SIGN}${query}`
}

export async function useRecepeApi(path, options = '') {
  const query = options.query ? getQuery(options.query) : ''
  const requestURI = getRequestURI(path, query)
  return useFetch(requestURI)
}

export async function useFetch(requestURI) {
  const res = await fetch(requestURI)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const jsonRes = await res.json()
  return jsonRes
}


export async function useRecipeInformation (id) {
    try {
        return await useRecepeApi(`recipes/${id}/information`)
    } catch {
        throw new Error('An error occurred while trying to retrieve recipe information');
    }
}

export async function useRecipeSearch (query) {
    try {
      const result = await useRecepeApi('recipes/complexSearch', { query })
      console.log(result);
        return result
    } catch {
        throw new Error('An error occurred while trying to search recipes');
    }
}