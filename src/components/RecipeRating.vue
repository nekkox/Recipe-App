<script setup lang="ts">
import { ref } from "vue";

import { useRatingStore } from "@/stores/rating";
const store = useRatingStore();

const props =defineProps(['id']);

const rating = ref(store.getRatingById(props.id));

const saveRating = () => {
  store.saveRating({id: props.id, rating: rating.value});
};

</script>
<template>
  <div class="flex items-center">
    <v-rating
      v-model="rating"
      color="light-green"
      :readonly=false
      half-increments
      item-aria-label="This item is rated {0} of {1}"
      hover
      @click="saveRating"
    ></v-rating>
  </div>
</template>