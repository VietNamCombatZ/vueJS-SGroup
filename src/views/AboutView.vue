<script setup>
import { useCounterStore } from '../stores/counter'
const counterStore = useCounterStore();
</script>

<template>
  <div class="about">
    <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="counterStore.increment()">{{counterStore.count}}</button>
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
