<template >
    <div v-for="city in locations" class="cityCards" :key="city.id" draggable="true">
        <cityCard :city="city" />
    </div>
    <div>
        <input ref="input" list="cityList" v-model.trim="cityInput" @keyup="handleGetCity"
            @keyup.enter="handleAddCity(selectedCity)">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.describe" :key="option.id">
                {{ option.describe }}
            </option>
        </datalist>
        <button @click="handleAddCity(selectedCity)">&#9989;</button>
    </div>
</template>

<script setup lang='ts'>
import { computed, ref, inject } from 'vue';
import { City, Cities } from '../types/City';
import _ from 'lodash'
import cityCard from './CityCard.vue'
import getCity from '../hooks/getCity';
import { CityKey } from '../types/injection-key';



const input = ref(null)
const cityInput = ref<string>()
const options = ref([])
const { locations, addCity } = inject(CityKey)
const debouncedGetCity = _.debounce(getCityByName, 1000)


const selectedCity = computed<City>(() => {
    return options.value.find((el) => el.describe === cityInput.value)
})

function handleAddCity(city: City) {
    const target = input.value as HTMLInputElement
    target.blur()
    if (!city) {
        return alert('ented and choose valid city')
    }
    addCity(city)
}

async function getCityByName() {
    const result = await getCity(`direct`, cityInput.value.trim())
    options.value = [...result]
    console.log(options.value[0])
}

function handleGetCity() {
    if (!cityInput.value && !cityInput.value.trim()) {
        options.value = []
        return
    }
    debouncedGetCity()
}

defineProps<{
    locations: Cities
}>()


</script>

<style scoped lang="scss">
h1 {
    border: 1px solid black;
}

.cityCards {
    display: flex;
    flex-direction: column;
}

div {
    display: flex;


    input {
        min-height: 40px;
        border: solid 1px black;
        border-right: none;
        border-radius: 0 0 0 12px;
        width: 100%;
    }

    button {
        border: 1px solid black;
        border-left: none;
        border-radius: 0 0 12px 0;
    }
}

button {
    cursor: pointer;
    border-radius: 5px;
}

img {
    height: $icon-height;
    width: $icon-width;
}
</style>