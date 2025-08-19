<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Projects</h1>
          <p class="mt-2 text-gray-600">Manage your projects and collaborate with your team</p>
        </div>
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Create Project
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="text-lg font-medium">Failed to load projects</p>
          <p class="text-sm text-gray-600 mt-1">{{ error }}</p>
        </div>
        <button
          @click="fetchProjects"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Projects Grid -->
      <div
        v-else-if="projects.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          :class="{ 'opacity-60': project.is_archive }"
        >
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-lg font-semibold text-gray-900 truncate">{{ project.title }}</h3>
            <span
              v-if="project.is_archive"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              Archived
            </span>
          </div>

          <p class="text-gray-600 mb-4 text-sm leading-relaxed">{{ project.description }}</p>

          <div v-if="project.assigned" class="flex items-center text-sm text-gray-500 mb-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            Assigned to: {{ project.assigned }}
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <div class="flex space-x-2">
              <button
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                @click="editProject(project)"
              >
                Edit
              </button>
              <button
                v-if="!project.is_archive"
                class="text-orange-600 hover:text-orange-700 text-sm font-medium"
                @click="archiveProject(project.id!)"
              >
                Archive
              </button>
            </div>
            <span class="text-xs text-gray-400"> ID: {{ project.id?.substring(0, 8) }}... </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg
          class="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first project</p>
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Create Your First Project
        </button>
      </div>

      <!-- Create Project Modal -->
      <CreateProjectModal
        :is-open="showCreateModal"
        @close="showCreateModal = false"
        @success="handleProjectCreated"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateProjectModal from '@/components/CreateProjectModal.vue'
import { projectsApi, type Project } from '@/apis/projects'

const projects = ref<Project[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const showCreateModal = ref(false)

const openCreateModal = () => {
  showCreateModal.value = true
}

const fetchProjects = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await projectsApi.getProjects()

    if (response.success) {
      projects.value = response.data
    } else {
      throw new Error(response.message || 'Failed to fetch projects')
    }
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
}

const handleProjectCreated = (newProject: Project) => {
  projects.value.unshift(newProject)
}

const editProject = (project: Project) => {
  // TODO: Implement edit functionality
  console.log('Edit project:', project)
  alert('Edit functionality will be implemented next!')
}

const archiveProject = async (projectId: string) => {
  if (!confirm('Are you sure you want to archive this project?')) return

  try {
    const response = await projectsApi.archiveProject(projectId)
    if (response.success) {
      // Update the project in the list
      const projectIndex = projects.value.findIndex((p) => p.id === projectId)
      if (projectIndex !== -1) {
        projects.value[projectIndex] = response.data
      }
      alert('Project archived successfully!')
    } else {
      throw new Error(response.message || 'Failed to archive project')
    }
  } catch (err) {
    console.error('Error archiving project:', err)
    alert(`Error archiving project: ${(err as Error).message}`)
  }
}

// Fetch projects on component mount
onMounted(() => {
  fetchProjects()
})
</script>
