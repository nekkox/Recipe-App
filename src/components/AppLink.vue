<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>


<template>
    <RouterLink :to="props.to" class="app-link">
        <slot></slot>
    </RouterLink>
</template>

<style scoped>
.app-link {
   width: 120px;
   height: 15px;
  

}
</style>