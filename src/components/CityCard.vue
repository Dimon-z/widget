<template >
    <div>
        <img src="../assets/grip.svg" alt="Settings" />
        City : {{ city.name }},<br> Country : {{ city.country }}
        <button @click="emit('deleteCity', city.id)">
            <img src="../assets/delete.svg" alt="Settings" />
        </button>
    </div>
</template>

<script setup lang='ts'>

import { City } from '../types/City';



defineProps<{
    city: City
}>()

const emit = defineEmits<{
    (e: 'deleteCity', id: City['id']): void
}>()
</script>


<style  scoped lang="scss">
div {
    display: flex;
    min-height: 40px;
    width: $app-width;
    max-width: 400px;
    border-top: 1px solid black;

    align-content: flex-start;

    img {
        align-self: center;
        height: 24px;
        width: 24px;
    }

    button {
        align-self: center;
        margin-left: auto;
    }
}
</style>