<template >
    <div>
        <img src="../assets/settings.svg" alt="Settings" />
        City : {{ city.name }} , Country : {{ city.country }}
        <button @click="emit('deleteCity', city.id)">
            <img src=" ../assets/settings.svg" alt="Settings" />
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
    width: 300px;
    border: 1px solid black;
    padding: 5px;
    align-content: center;
}

img {
    height: 24px;
    width: 24px;
}
</style>