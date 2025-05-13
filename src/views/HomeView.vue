<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useCounterStore } from '../stores/counter'
const counterStore = useCounterStore();
</script>

<template>
  <main>
    <TheWelcome /><button class="px-4 py-2 bg-blue-500 text-white rounded" @click="counterStore.increment()">{{counterStore.count}}</button>
  </main>
</template>
