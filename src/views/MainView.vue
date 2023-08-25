<template >
    <div class="wrapper">
        <div class="wrapper-header">
            <h1>
                Settings
            </h1>
            <div>
                <button @click="openSettings" class="weather-settings">
                    <img src="../assets/settings.svg" alt="Settings" />
                </button>
            </div>
        </div>
        <KeepAlive>
            <component :is="state ? WeatherMain : WeatherSettings" :locations="locations" />
        </KeepAlive>
    </div>
</template>

<script setup lang='ts'>
import { provide, ref } from 'vue';
import WeatherMain from '../components/WeatherMain.vue'
import WeatherSettings from '../components/WeatherSettings.vue'
import { Cities, City } from '../types/City';
import useGeolocation from '../hooks/UseGeolocation';
import getCity from '../hooks/getCity';
import { lsGet, lsSet, lsListeningToUpdates, lsIsExist } from '../utils/localStorage'
import { CityKey } from '../types/injection-key';

const state = ref(true)
const locations = ref<Cities>([])

function chekPositionInLS(): void {
    if (lsIsExist<Cities>('locations') && (lsGet<Cities>('locations').length > 0)) {
        locations.value = lsGet<Cities>('locations')
    } else {
        useGeolocation()
            .then(data => getCity('reverse', 'lat=' + `${data.latitude}` + '&lon=' + `${data.longitude}`))
            .then(data => locations.value.push(data[0]))
            .then(() => lsSet('locations', locations.value))
    }
}

function deleteCity(id: City[`id`]): void {
    console.log(id)
    locations.value = locations.value.filter((el) => !(el.id === id))
    lsSet('locations', locations.value)
}

chekPositionInLS()

function openSettings(): void {
    state.value = !state.value
}

function addCity(city: City): void {
    if (locations.value.some((el) => el.describe === city.describe)) {
        return
    }
    locations.value.push(city)
    lsSet('locations', locations.value)
}

provide(CityKey, { locations, deleteCity, addCity })

</script>

<style scoped lang="scss">
.wrapper {
    width: $app-width;
    border: 1px solid black;
    border-radius: 16px;
    background-color: $app-background-color;
    min-width: 200px;
    max-width: 400px;

    &-header {
        display: flex;
        justify-content: space-between;
    }
}

button {
    cursor: pointer;
}

img {
    height: 30px;
    width: 30px;
}

h1 {
    padding-left: 16px;
    align-self: flex-start;
}

.weather-settings {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $icon-width ;
    height: $icon-height ;
    border-radius: $app-border-radius;
}
</style>
