<template>
  <div class="max-w-3xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Lists in Board</h2>
    <form @submit.prevent="handleCreateList" class="mb-6 flex gap-2">
      <input
        v-model="newListTitle"
        type="text"
        placeholder="New list title"
        class="border rounded px-3 py-2 w-full"
        required
      />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Create List</button>
    </form>
    <div v-if="isLoading" class="py-8 text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 py-8 text-center">{{ error }}</div>
    <div v-else>
      <div v-if="lists.length === 0" class="text-gray-500 py-8 text-center">No lists found.</div>
      <DraggableList :lists="lists" :boardId="boardId" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projectsApi, type List } from '@/apis/projects'
import DraggableList from '@/components/DraggableList.vue'
const route = useRoute()
const boardId = route.params.boardId as string
const lists = ref<List[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const newListTitle = ref('')
const fetchLists = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.getListsOfBoard(boardId)
    if (response.success) {
      lists.value = response.data
    } else {
      throw new Error(response.message || 'Failed to fetch lists')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}
onMounted(fetchLists)

const handleCreateList = async () => {
  if (!newListTitle.value.trim()) return
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.createList(boardId, { title: newListTitle.value })
    if (response.success) {
      lists.value.push(response.data)
      newListTitle.value = ''
    } else {
      throw new Error(response.message || 'Failed to create list')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}
</script>
