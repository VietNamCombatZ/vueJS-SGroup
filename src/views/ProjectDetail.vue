<template>
  <div class="max-w-4xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Boards in Project</h2>
    <div v-if="isLoading" class="py-8 text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 py-8 text-center">{{ error }}</div>
    <div v-else>
      <div v-if="boards.length === 0" class="text-gray-500 py-8 text-center">No boards found.</div>
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="board in boards" :key="board.id" class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold text-lg">{{ board.title }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projectsApi, type Board } from '@/apis/projects'
const route = useRoute()
const projectId = route.params.projectId as string
const boards = ref<Board[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const fetchBoards = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.getBoards(projectId)
    if (response.success) {
      boards.value = response.data
    } else {
      throw new Error(response.message || 'Failed to fetch boards')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}
onMounted(fetchBoards)
</script>
