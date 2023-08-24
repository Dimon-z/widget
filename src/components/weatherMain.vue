<template >
    <div class="wrap">
        <div class="weather-info__wrapper" v-for="city in locations" :key="city.id">
            <WeatherInfo :city="city" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import WeatherError from '../components/WeatherError.vue'
import WeatherInfo from '../components/WeatherInfo.vue'
import WeatherLoading from '../components/WeatherLoading.vue'
import { Cities } from '../types/City';

const weatherState = ref('loading');

defineProps<{
    locations: Cities
}>()

const emit = defineEmits<{
    (e: 'settings'): void
}>()


</script>

<style scoped lang="scss">
.weather-info__wrapper {
    border-top: 1px solid rgb(0, 0, 0);
    width: $app-width;
    min-width: 200px;
    max-width: 400px;
}
</style>
