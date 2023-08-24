<template >
    <!-- <div v-for="state in weather" key="id">
        <WeatherLoading v-if="weatherState === 'loading'" />
        <WeatherInfo v-else-if="weatherState === 'sucess'" :="state" />
        <WeatherError v-else-if="weatherState === 'error'" :="state" />
    </div> -->
    <div v-for="city in locations" :key="city.id">
        <WeatherInfo :city="city" />
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import WeatherError from '../components/WeatherError.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import WeatherLoading from '../components/WeatherLoading.vue'
import { Cities } from '../types/City';

const weatherState = ref('loading');

//if в локалсторадже насрано то мы не вызываем
// в локалсторадже храним города в виде координат(зачеркнуто) городов
defineProps<{
    locations: Cities
}>()

const emit = defineEmits<{
    (e: 'settings'): void
}>()


</script>

<style scoped  ></style>
