<template>
  <div class="max-w-4xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Boards in Project</h2>
    <form @submit.prevent="handleCreateBoard" class="mb-6 flex gap-2">
      <input
        v-model="newBoardTitle"
        type="text"
        placeholder="New board title"
        class="border rounded px-3 py-2 w-full"
        required
      />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Create Board</button>
    </form>
    <div v-if="isLoading" class="py-8 text-center">Loading...</div>
    <div v-else-if="error" class="text-red-600 py-8 text-center">{{ error }}</div>
    <div v-else>
      <div v-if="boards.length === 0" class="text-gray-500 py-8 text-center">No boards found.</div>
      <ul v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li v-for="board in boards" :key="board.id" class="bg-white p-4 rounded shadow">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="font-semibold text-lg">{{ board.title }}</h3>
              <p v-if="board.description" class="text-sm text-gray-600 mt-1">
                {{ board.description }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <router-link :to="`/boards/${board.id}`" class="text-blue-600 hover:underline"
                >Open</router-link
              >
              <button class="text-amber-700 hover:underline" @click="startEdit(board)">Edit</button>
              <button class="text-red-600 hover:underline" @click="archive(board.id)">
                Archive
              </button>
            </div>
          </div>

          <div v-if="editingBoardId === board.id" class="mt-3 border-t pt-3">
            <form @submit.prevent="saveEdit(board.id)" class="space-y-2">
              <input
                v-model="editTitle"
                type="text"
                class="border rounded px-2 py-1 w-full"
                placeholder="Title"
              />
              <textarea
                v-model="editDescription"
                class="border rounded px-2 py-1 w-full"
                rows="2"
                placeholder="Description"
              ></textarea>
              <div class="flex gap-2">
                <button type="submit" class="bg-emerald-600 text-white px-3 py-1 rounded">
                  Save
                </button>
                <button type="button" class="px-3 py-1 rounded border" @click="cancelEdit">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projectsApi, type Board as ApiBoard } from '@/apis/projects'
type Board = ApiBoard & { description?: string }
const route = useRoute()
const projectId = route.params.projectId as string
const boards = ref<Board[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const newBoardTitle = ref('')
const editingBoardId = ref<string | null>(null)
const editTitle = ref('')
const editDescription = ref('')

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

const handleCreateBoard = async () => {
  if (!newBoardTitle.value.trim()) return
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.createBoard(projectId, { title: newBoardTitle.value })
    if (response.success) {
      boards.value.push(response.data)
      newBoardTitle.value = ''
    } else {
      throw new Error(response.message || 'Failed to create board')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchBoards)

const startEdit = (board: Board) => {
  editingBoardId.value = board.id
  editTitle.value = board.title
  editDescription.value = board.description || ''
}

const cancelEdit = () => {
  editingBoardId.value = null
  editTitle.value = ''
  editDescription.value = ''
}

const saveEdit = async (boardId: string) => {
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.updateBoard(boardId, {
      title: editTitle.value,
      description: editDescription.value,
    })
    if (response.success) {
      const idx = boards.value.findIndex((b) => b.id === boardId)
      if (idx !== -1) {
        boards.value[idx] = { ...boards.value[idx], ...response.data }
      }
      cancelEdit()
    } else {
      throw new Error(response.message || 'Failed to update board')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

const archive = async (boardId: string) => {
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.archiveBoard(boardId)
    if (response.success) {
      boards.value = boards.value.filter((b) => b.id !== boardId)
    } else {
      throw new Error(response.message || 'Failed to archive board')
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}
</script>
