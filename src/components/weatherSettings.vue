<template >
    <div>
        <input v-model="city" @focusout="$emit('addCity', city)" type="text">
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type Location from '../types/Location'


const city = ref()

async function getCoords() {
    let result = await fetch('http://api.openweathermap.org/geo/1.0/direct?q= + `${city}` + &limit=5&appid= + `${}`')
    let coords = await result.json()

}

defineProps<{
    loc: Array<Location>
}>()

defineEmits<{
    (e: 'addCity', city: Location): void
}>()
</script>

<style scoped></style>