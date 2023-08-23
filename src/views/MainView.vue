<template >
    <div>
        <KeepAlive>
            <component :is="state ? WeatherMain : WeatherSettings" :locations="locations" @addCity="newCity"
                @settings="openSettings" />
        </KeepAlive>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import WeatherMain from '../components/WeatherMain.vue'
import WeatherSettings from '../components/WeatherSettings.vue'
import { Cities, City } from '../types/City';
import useGeolocation from '../hooks/UseGeolocation';
import getCity from '../hooks/getCity';

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
    "state": "England",
    "id": 100500
},])

useGeolocation()
    .then(async data => await getCity('reverse', 'lat=' + `${data.latitude}` + '&lon=' + `${data.longitude}`))
    .then(data => locations.value.push(data[0]))
function openSettings(): void {
    state.value = !state.value
}

function newCity(city: City): void {
    locations.value.push(city)
}


</script>

<style scoped ></style>