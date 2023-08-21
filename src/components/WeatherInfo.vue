<template >
    <div>
        {{ city.name }}
        {{ weather?.main }}
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { City } from '../types/City';
import { OpenWeather } from '../types/Weather';
const weather = ref<OpenWeather>()

const props = defineProps<{
    city: City
}>()
async function getWeather(city: City): Promise<OpenWeather> {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + `${city.lat}` + '&lon=' + `${city.lon}` + '&appid=' + `${process.env.OPENWEATHER_API_KEY}` + '&units=metric')
    const result = await response.json()
    return result
}
getWeather(props.city)
    .then(data => weather.value = data)

</script>

<style scoped></style>