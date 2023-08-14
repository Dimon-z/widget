<template >
    <!-- <div v-for="state in weather" key="id">
        <WeatherLoading v-if="weatherState === 'loading'" />
        <WeatherInfo v-else-if="weatherState === 'sucess'" :="state" />
        <WeatherError v-else-if="weatherState === 'error'" :="state" />
    </div> -->
    {{ loc }}
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import WeatherError from '../components/WeatherError.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import WeatherLoading from '../components/WeatherLoading.vue'
import useWeather from '../hooks/UseWeather'
import type Location from '../types/Location'


const weatherState = ref('loading');

//if в локалсторадже насрано то мы не вызываем
// в локалсторадже храним города в виде координат
const props = defineProps<{
    loc: Array<Location>
}>()


useWeather(props.loc)

</script>

<style scoped></style>
