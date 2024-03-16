//ok

import { defineStore } from "pinia";
import { ref } from "vue";


export const useCacheStore = defineStore('cache', () => {
    const cache = ref([])

    //get data
    const cachedData = (key) => {
        try{
        return cache.value[key]
        } catch(e){
            return undefined
        }
    }

    //store data
    const cacheData = (key, data) => {
        cache.value[key] = data
    }
    return { cachedData, cacheData }
    })