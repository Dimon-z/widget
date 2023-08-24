<template >
    <div>
        <button @click="openSettings" class="weather-settings">
            <img src="../assets/settings.svg" alt="Settings" />
        </button>
        <KeepAlive>
            <component :is="state ? WeatherMain : WeatherSettings" :locations="locations" @addCity="newCity"
                @settings="openSettings" @deleteCity="deleteCity" />
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
import { lsGet, lsSet, lsListeningToUpdates, lsIsExist } from '../utils/localStorage'

const state = ref(true)
const locations = ref<Cities>([])

function chekPositionInLS(): void {
    if (lsIsExist('locations')) {
        locations.value = lsGet<Cities>('locations')
    } else {
        useGeolocation()
            .then(data => getCity('reverse', 'lat=' + `${data.latitude}` + '&lon=' + `${data.longitude}`))
            .then(data => locations.value.push(data[0]))
            .then(() => lsSet('locations', locations.value))
    }
}

function deleteCity() {
    //писать тут или юзнуть провайд инжект
}

chekPositionInLS()

function openSettings(): void {
    state.value = !state.value
}

function newCity(city: City): void {
    locations.value.push(city)
    lsSet('locations', locations.value)
}


</script>

<style scoped >
button {
    cursor: pointer;
}

img {
    height: 32px;
    width: 32px;
}

.weather-settings {
    position: absolute;
    top: 10px;
    left: calc(1/4*100vw);
    background-color: rgb(154, 201, 241);
}
</style>