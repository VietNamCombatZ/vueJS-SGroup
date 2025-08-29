<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4" @click.stop>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Manage Project Members</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div v-if="project" class="mb-6">
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ project.title }}</h3>
        <p class="text-sm text-gray-600">{{ project.description }}</p>
      </div>

      <!-- Add Member Section -->
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3">Add New Member</h4>
        <form @submit.prevent="handleAddMember" class="flex gap-3">
          <input
            v-model="newMemberUserId"
            type="text"
            placeholder="Enter User ID"
            required
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            :disabled="isAddingMember || !newMemberUserId.trim()"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-md transition-colors flex items-center"
          >
            <svg
              v-if="isAddingMember"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isAddingMember ? 'Adding...' : 'Add Member' }}
          </button>
        </form>
      </div>

      <!-- Current Members Section -->
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3">Current Members</h4>
        <div class="bg-gray-50 rounded-lg p-4">
          <div v-if="projectMembers.length === 0" class="text-center text-gray-500 py-4">
            <svg
              class="w-8 h-8 mx-auto mb-2 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 110 5.292M21 21v-1a4 4 0 00-3-3.87"
              ></path>
            </svg>
            <p class="text-sm">No members found</p>
            <p class="text-xs text-gray-400 mt-1">Add members to see them listed here</p>
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="member in projectMembers"
              :key="member.userId"
              class="flex items-center justify-between p-3 bg-white rounded-md border"
            >
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">User {{ member.userId }}</p>
                  <p class="text-sm text-gray-500">Role: {{ member.role }}</p>
                </div>
              </div>

              <button
                @click="handleDeleteMember(member.userId)"
                :disabled="isDeletingMember === member.userId"
                class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                title="Remove member"
              >
                <svg
                  v-if="isDeletingMember === member.userId"
                  class="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end">
        <button
          @click="closeModal"
          class="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { projectsApi, type Project, type ProjectMember } from '@/apis/projects'

interface Props {
  isOpen: boolean
  project?: Project | null
}

interface Emits {
  (e: 'close'): void
  (e: 'memberAdded'): void
  (e: 'memberRemoved'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const newMemberUserId = ref('')
const projectMembers = ref<ProjectMember[]>([])
const isAddingMember = ref(false)
const isDeletingMember = ref<string | null>(null)

// Mock data for demonstration - in a real app, you'd fetch this from an API
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.project) {
      // Mock some members for demonstration
      projectMembers.value = [
        { id: 'pm1', userId: 'user1', projectId: props.project.id || '', role: 'ADMIN' },
        { id: 'pm2', userId: 'user2', projectId: props.project.id || '', role: 'MEMBER' },
        { id: 'pm3', userId: 'user3', projectId: props.project.id || '', role: 'MEMBER' },
      ]
    }
  },
)

const closeModal = () => {
  newMemberUserId.value = ''
  emit('close')
}

const handleAddMember = async () => {
  if (isAddingMember.value || !props.project?.id || !newMemberUserId.value.trim()) return

  try {
    isAddingMember.value = true

    const response = await projectsApi.addMemberToProject(props.project.id, {
      userId: newMemberUserId.value.trim(),
    })

    if (response.success) {
      // Add the new member to the local list
      projectMembers.value.push({
        id: response.data.id,
        userId: response.data.userId,
        projectId: response.data.projectId,
        role: response.data.role,
      })

      newMemberUserId.value = ''
      emit('memberAdded')

      alert('Member added successfully!')
    } else {
      throw new Error(response.message || 'Failed to add member')
    }
  } catch (error) {
    console.error('Error adding member:', error)
    alert(`Error adding member: ${(error as Error).message}`)
  } finally {
    isAddingMember.value = false
  }
}

const handleDeleteMember = async (userId: string) => {
  if (!confirm('Are you sure you want to remove this member from the project?')) return

  if (!props.project?.id) return

  try {
    isDeletingMember.value = userId

    const response = await projectsApi.deleteMemberFromProject(props.project.id, userId)

    if (response.success) {
      // Remove the member from the local list
      projectMembers.value = projectMembers.value.filter((member) => member.userId !== userId)
      emit('memberRemoved')

      alert('Member removed successfully!')
    } else {
      throw new Error(response.message || 'Failed to remove member')
    }
  } catch (error) {
    console.error('Error removing member:', error)
    alert(`Error removing member: ${(error as Error).message}`)
  } finally {
    isDeletingMember.value = null
  }
}
</script>
