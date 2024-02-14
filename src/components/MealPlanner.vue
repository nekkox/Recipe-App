<script setup>
import CalendarDays from '@/components/CalendarDays.vue'
</script>

<template>
    <CalendarDays :days="7" :date="new Date()">

    </CalendarDays>
</template>