<template >
    <WeatherMain v-if="appState === 'main'" />
    <WeatherSettings v-else-if="appState === 'settings'" />
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import WeatherMain from '../components/WeatherMain.vue'
import WeatherSettings from '../components/WeatherSettings.vue'

const image = ref()
const appState = ref('main')


</script>

<style scoped>
div {
    background-image: image();
}
</style>