<template >
    <button @click="openSettings">
        <img src="../assets/settings.svg" alt="Settings" />
    </button>
    <div>
        <KeepAlive>
            <component :is="state ? WeatherMain : WeatherSettings" :locations="locations" @addCity="newCity" />
        </KeepAlive>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import WeatherMain from '../components/WeatherMain.vue'
import WeatherSettings from '../components/WeatherSettings.vue'
import useGeolocation from '../hooks/UseGeolocation'
import { Cities, City } from '../types/City';
import Location from '../types/Location';

const image = ref()
const appState = ref('main')
const state = ref(true)
const locations = ref<Cities>([{
    "name": "City of London",
    "local_names": {
        "es": "City de Londres",
        "ru": "Сити",
        "ur": "لندن شہر",
        "zh": "倫敦市",
        "en": "City of London",
        "pt": "Cidade de Londres",
        "fr": "Cité de Londres",
        "uk": "Лондонське Сіті",
        "he": "הסיטי של לונדון",
        "hi": "सिटी ऑफ़ लंदन",
        "ko": "시티 오브 런던",
        "lt": "Londono Sitis"
    },
    "lat": 51.5156177,
    "lon": -0.0919983,
    "country": "GB",
    "state": "England"
},])
console.log(locations.value)
/* useGeolocation()
    .then(data => locations.value.push(data))
 */
function openSettings() {
    state.value = !state.value
}

function newCity(city: City) {
    locations.value.push(city)
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