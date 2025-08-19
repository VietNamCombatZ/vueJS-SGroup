<script setup lang="ts">
import { Route } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
// import { useAuthStore } from '@/stores/auth'

const counter = ref(0)
const textCount = computed(() => {
  return `Counter: ${counter.value}`
})

// const authStore = useAuthStore();

</script>

<template>
  <RouterLink
    to="/"
    class="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700"
  >
    Go To Home
  </RouterLink>

  <p class="text-sm text-gray-500">
    {{ textCount }}
  </p>

  <button
    @click="counter++"
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Increment
  </button>
</template>
