<template>
  <draggable
    v-model="lists"
    @end="onDragEnd"
    item-key="id"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <template #item="{ element: list }">
      <li class="bg-white p-4 rounded shadow">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 v-if="editingListId !== list.id" class="font-semibold text-lg">{{ list.title }}</h3>
            <input v-else v-model="editTitle" class="border rounded px-2 py-1 w-full" />
            <!-- <p class="text-sm text-gray-600">Position: {{ list.position }}</p> -->
            <span v-if="list.is_archive" class="text-xs text-red-500">Archived</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-if="editingListId !== list.id"
              class="text-amber-700 hover:underline"
              @click="startEdit(list)"
            >
              Edit
            </button>
            <button
              v-if="editingListId === list.id"
              class="bg-emerald-600 text-white px-3 py-1 rounded"
              @click="saveEdit(list.id)"
            >
              Save
            </button>
            <button
              v-if="editingListId === list.id"
              class="px-3 py-1 rounded border"
              @click="cancelEdit"
            >
              Cancel
            </button>
            <button class="text-red-600 hover:underline" @click="archive(list.id)">Archive</button>
          </div>
        </div>
      </li>
    </template>
  </draggable>
</template>
<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import draggable from 'vuedraggable'
import { projectsApi, type List } from '@/apis/projects'
const props = defineProps<{ lists: List[]; boardId: string }>()
const lists = ref<List[]>(props.lists)
watch(
  () => props.lists,
  (val) => {
    lists.value = val
  },
  { deep: true },
)
const editingListId = ref<string | null>(null)
const editTitle = ref('')
const startEdit = (list: List) => {
  editingListId.value = list.id
  editTitle.value = list.title
}
const cancelEdit = () => {
  editingListId.value = null
  editTitle.value = ''
}
const saveEdit = async (listId: string) => {
  if (!editTitle.value.trim()) return
  const response = await projectsApi.updateList(listId, { title: editTitle.value })
  if (response.success) {
    const idx = lists.value.findIndex((l) => l.id === listId)
    if (idx !== -1) lists.value[idx].title = editTitle.value
    cancelEdit()
  }
}
const archive = async (listId: string) => {
  const response = await projectsApi.archiveList(listId)
  if (response.success) {
    const idx = lists.value.findIndex((l) => l.id === listId)
    if (idx !== -1) lists.value[idx].is_archive = true
  }
}
const onDragEnd = async () => {
  const sortedIds = lists.value.map((l) => l.id)
  await projectsApi.sortBoardLists(props.boardId, sortedIds)
}
</script>
