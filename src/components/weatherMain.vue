<template >
    <div v-for="item in guf " :key="item">
        {{ item }}
    </div>
    <input v-model="input" />
    <button @click="comp"></button>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const guf = ref([`1`, 2, 3, 4, 5, 6, 7])
let input = ref();

function comp() {
    guf.value.push(input.value)
}
</script>

<style scoped>
button {
    display: block;
    width: 150px;
    height: 30px;
}
</style>
