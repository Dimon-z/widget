<template >
    <button @click="openSettings">
        <img src="../assets/settings.svg" alt="Settings" />
    </button>
    <div>
        <KeepAlive>
            <component :is="state ? WeatherMain : WeatherSettings" :loc="locations" @addCity="newCity" />
        </KeepAlive>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import WeatherMain from '../components/WeatherMain.vue'
import WeatherSettings from '../components/WeatherSettings.vue'
import useGeolocation from '../hooks/UseGeolocation'
import { City } from '../types/City';
import Location from '../types/Location';

const image = ref()
const appState = ref('main')
const state = ref(true)
const locations = ref([{ latitude: 123, longitude: 341 }])
console.log(locations.value)
useGeolocation()
    .then(data => locations.value.push(data))

function openSettings() {
    state.value = !state.value
}

function newCity(city: City) {
    console.log(city.lat, city.lon)
    const loc: Location = { latitude: city.lat, longitude: city.lon }
    locations.value.push(loc)
}




</script>

<style scoped>
button {
    cursor: pointer;
}

img {
    height: 32px;
    width: 32px;
}
</style>