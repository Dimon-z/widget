<template >
    <div>
        <input list="cityList" v-model="city" type="text" @keyup="getCity">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.name">
                {{ option.name + ' ' + option.country }}
            </option>
        </datalist>
        <button @click="$emit('addCity', city)">Ок!</button>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import type Location from '../types/Location'
import { Weather } from '../types/Weather';
import { City, Root } from '../types/City';

const city = ref<City>()
const selected = ref()
const options = ref([])

async function getCity() {
    if (!city.value) {
        options.value = []
        return
    }
    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + `${city.value}` + `&limit=5&appid=` + `${process.env.OPENWEATHER_API_KEY}`)
    const response: Array<City> = await result.json()
    response.forEach((el, i) => {
        el.id = i
    });
    options.value = [...response]
}
/* function addCoords(): void {
    console.log(city)
    emit { latitude: city.value.lat, longitude: city.value.lon }
}
 */

const log = () => console.log(city.value)

defineProps<{
    loc: Array<Location>
}>()

defineEmits<{
    (e: 'addCity', city: Location): void
}>()
</script>

<style scoped></style>