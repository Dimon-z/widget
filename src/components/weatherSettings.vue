<template >
    <div v-for="city in locations" class="cityCards" :key="city.id">
        <cityCard :city="city" />
    </div>
    <div>
        <input list="cityList" v-model="cityInput" @keyup="debouncedGetCity"
            @focusout="selectedCity ? emit(`addCity`, selectedCity) : {}">
        <datalist id="cityList">
            <option v-for="option in options" v-bind:value="option.describe" :key="option.id"
                @deleteCity="emit('deleteCity', $event)">
                {{ option.describe }}
            </option>
        </datalist>
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
    (e: 'deleteCity', id: City['id']): void
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
        border-radius: 0 0 12px 12px;
        width: 100%;
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