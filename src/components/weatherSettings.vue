<template >
    <div>
        <button @click="emit('settings')" class="weather-settings">
            <img src="../assets/settings.svg" alt="Settings" />
        </button>
        <input list="cityList" v-model="cityInput" @keyup="debouncedGetCity"
            @focusout="selectedCity ? emit(`addCity`, selectedCity) : {}">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.describe" :key="option.id"
                @deleteCity="emit('deleteCity', $event)">
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
import getCity from '../hooks/getCity';

const cityInput = ref<string>()
const options = ref([])

const selectedCity = computed(() => {
    return options.value.find((el) => el.describe == cityInput.value)
})

const debouncedGetCity = _.debounce(getCityByName, 1000)

async function getCityByName() {
    if (!cityInput.value) {
        options.value = []
        return
    }
    const result = await getCity(`direct`, cityInput.value)
    options.value = [...result]
}

defineProps<{
    locations: Cities
}>()

const emit = defineEmits<{
    (e: 'addCity', city: City): void
    (e: 'settings'): void
    (e: 'deleteCity', id: City['id']): void
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
    left: calc(100vw/4);
    background-color: rgb(154, 201, 241);
}
</style>