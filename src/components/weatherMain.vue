<template >
    <WeatherLoading v-if="weatherState === 'loading'" />
    <WeatherInfo v-else-if="weatherState === 'sucess'" :="weather" />
    <WeatherError v-else-if="weatherState === 'error'" :="error" />
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import WeatherError from '../components/WeatherError.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import WeatherLoading from '../components/WeatherLoading.vue'


const weatherState = ref('loading');
const weather = ref();
const error = ref();
</script>

<style scoped></style>
