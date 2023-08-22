<template >
    <div>
        <input list="cityList" v-model="cityInput" @keyup="debouncedGetCity"
            @focusout="selectedCity ? emit(`addCity`, selectedCity) : {}">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.describe" :key="option.id">
                {{ option.describe }}
            </option>
        </datalist>
    </div>
    <div v-for="city in locations" class="cityCards" :key="city.id">
        <cityCard :city="city" />
    </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { City, Cities } from '../types/City';
import _ from 'lodash'
import cityCard from './CityCard.vue'

const cityInput = ref<string>()
const options = ref([])

const selectedCity = computed(() => {
    return options.value.find((el) => el.describe == cityInput.value)
})

const debouncedGetCity = _.debounce(getCity, 1000)

async function getCity() {
    if (!cityInput.value) {
        options.value = []
        return
    }
    console.log('calling')
    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + `${cityInput.value}` + `&limit=5&appid=` + `${process.env.OPENWEATHER_API_KEY}`)
    const response: Cities = await result.json()
    response.forEach((el, i) => {
        el.describe = `${el.name + ' ' + el.country + ' ' + el.state}`
        el.id = Date.now() + i * 3
    });
    options.value = [...response]
}

defineProps<{
    locations: Cities
}>()

const emit = defineEmits<{
    (e: 'addCity', city: City): void
}>()
</script>

<style scoped   lang="scss">
.cityCards {
    display: flex;
    flex-direction: column;
}

div {
    color: rgb(27, 19, 70);

    input {
        width: 300px;
        padding: 4px;
    }
}
</style>