<template >
    <div class="wrapper">
        <h1>
            {{ city.name + `,` + ` ` + city.country }}
        </h1>
        <div class="icon__wrapper">
            <img :src='iconUrl' alt="Weather icon">
            <p class="icon__wrapper-text">
                {{ weather?.main.temp }}
            </p>
        </div>
        <div class="weather-main__info">
            <p>
                Feels like: {{ weather?.main.feels_like }} {{ weather?.weather[0].description }}
            </p>
            <p>
                Wind: {{ weather?.wind.speed + `m/s` + ` ` + weather?.wind.deg }}&#176;
                {{ weather?.main.pressure }} hPa
            </p>
            <p>
                Humidity:{{ weather?.main.humidity }}% Dew point: {{ weather?.dewpoint }}
            </p>
            <p>
                Visibility: {{ weather?.visibility / 1000 }} km
            </p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { City } from '../types/City';
import { OpenWeather } from '../types/Weather';
const weather = ref<OpenWeather>();
const iconUrl = ref<string>();



const props = defineProps<{
    city: City
}>()

const emit = defineEmits<{
    (e: 'stateChange', state: string): void
}>()

async function getWeather(city: City): Promise<OpenWeather> {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + `${city.lat}` + '&lon=' + `${city.lon}` + '&appid=' + `${process.env.OPENWEATHER_API_KEY}` + '&units=metric')
    const result = await response.json()
    return result
}
const dewFunc = (temp: number, humidity: number): number => (17.27 * temp) / (237.7 + temp) + Math.log(humidity / 100)
getWeather(props.city)
    .then(data => weather.value = data)
    .then(data => weather.value.dewpoint = Math.round((237.7 * dewFunc(+data.main.temp, +data.main.humidity)) / (17.27 - dewFunc(+data.main.temp, +data.main.humidity))))
    .then(data => iconUrl.value = "https://openweathermap.org/img/wn/" + `${weather.value.weather[0].icon}` + "@2x.png")
    .then()



</script>

<style scoped lang="scss">
.wrapper {
    display: block;
    min-width: 200px;
    max-width: 400px;
    width: 30vw;
    margin: 5px;
    padding: 5px;
    background-color: rgb(154, 201, 241);
    border: 1px solid black;
    border-radius: 10px;
    font: 1.1em sans-serif;
}

.icon__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-text {
        font-size: 60px;
        text-align: center;
    }
}

p {
    margin: 15px;
}

h1 {
    text-transform: capitalize;
    text-align: center;
}
</style>