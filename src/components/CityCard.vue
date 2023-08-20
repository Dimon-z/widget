<template >
    <div>
        <img src="../assets/settings.svg" alt="Settings" />
        City : {{ city.name }} , Country : {{ city.country }}
    </div>
</template>

<script setup lang='ts'>
import { } from 'vue';
import { City } from '../types/City';
import { Weather } from '../types/Weather';


defineProps<{
    city: City
}>()
</script>

<style scoped lang="scss">
div {
    display: flex;
    width: 250px;
    border: 1px solid black;
    padding: 5px;
    align-content: center;
}

img {
    height: 24px;
    width: 24px;
}
</style>