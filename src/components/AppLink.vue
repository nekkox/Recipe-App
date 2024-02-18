<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>


<template>
    <RouterLink :to="props.to" class="text-red">
        <slot></slot>
    </RouterLink>
</template>