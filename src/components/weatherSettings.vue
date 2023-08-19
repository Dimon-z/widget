<template >
    <div>
        <input list="cityList" v-model="cityInput" @keyup="getCity" @focusout="emit(`addCity`, selectedCity)">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.describe">
                {{ option.describe }}
            </option>
        </datalist>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import type Location from '../types/Location'
import { Weather } from '../types/Weather';
import { City, Root } from '../types/City';

const cityInput = ref()
const options = ref([])

const selectedCity = computed(() => {
    return options.value.find((el) => el.describe == cityInput.value)
})

async function getCity() {
    if (!cityInput.value) {
        options.value = []
        return
    }
    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + `${cityInput.value}` + `&limit=5&appid=` + `${process.env.OPENWEATHER_API_KEY}`)
    const response: Array<City> = await result.json()
    response.forEach((el) => {
        el.describe = `${el.name + ' ' + el.country + ' ' + el.state}`
    });
    options.value = [...response]
}

const log = (e: any) => console.log(e)

defineProps<{
    loc: Array<Location>
}>()

const emit = defineEmits<{
    (e: 'addCity', city: City): void
}>()
</script>

<style scoped></style>