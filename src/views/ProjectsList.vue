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

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            <!-- Edit Button -->
            <button
              @click="openEditModal(project)"
              class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit
            </button>

            <!-- Archive/Unarchive Button -->
            <button
              @click="handleArchiveProject(project)"
              :disabled="archivingProjects.has(project.id || '')"
              :class="[
                'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center',
                project.is_archive 
                  ? 'bg-green-50 hover:bg-green-100 text-green-700 disabled:bg-green-25' 
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-700 disabled:bg-orange-25'
              ]"
            >
              <svg 
                v-if="archivingProjects.has(project.id || '')"
                class="animate-spin w-4 h-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8l6 6V9h3a2 2 0 012 2v1M5 8V6a2 2 0 012-2h3v3m-3 7V8m0 0V6a2 2 0 012-2h3v3"></path>
              </svg>
              {{ archivingProjects.has(project.id || '') ? 'Processing...' : (project.is_archive ? 'Unarchive' : 'Archive') }}
            </button>

            <!-- Manage Members Button -->
            <button
              @click="openMembersModal(project)"
              class="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center mt-2"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a4 4 0 110 5.292M21 21v-1a4 4 0 00-3-3.87"></path>
              </svg>
              Manage Members
            </button>
          </div>

          <div class="mt-3 text-xs text-gray-400 text-center">
            ID: {{ project.id?.substring(0, 8) }}...
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

      <!-- Modals -->
      <CreateProjectModal
        :is-open="showCreateModal"
        @close="closeCreateModal"
        @success="handleProjectCreated"
      />

      <EditProjectModal
        :is-open="showEditModal"
        :project="selectedProject"
        @close="closeEditModal"
        @success="handleProjectUpdated"
      />

      <ManageMembersModal
        :is-open="showMembersModal"
        :project="selectedProject"
        @close="closeMembersModal"
        @memberAdded="handleMemberChanged"
        @memberRemoved="handleMemberChanged"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateProjectModal from '@/components/CreateProjectModal.vue'
import EditProjectModal from '@/components/EditProjectModal.vue'
import ManageMembersModal from '@/components/ManageMembersModal.vue'
import { projectsApi, type Project } from '@/apis/projects'

const projects = ref<Project[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showMembersModal = ref(false)
const selectedProject = ref<Project | null>(null)
const archivingProjects = ref(new Set<string>())

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const openEditModal = (project: Project) => {
  selectedProject.value = project
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedProject.value = null
}

const openMembersModal = (project: Project) => {
  selectedProject.value = project
  showMembersModal.value = true
}

const closeMembersModal = () => {
  showMembersModal.value = false
  selectedProject.value = null
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
  closeCreateModal()
}

const handleProjectUpdated = (updatedProject: Project) => {
  const index = projects.value.findIndex(p => p.id === updatedProject.id)
  if (index !== -1) {
    projects.value[index] = updatedProject
  }
  closeEditModal()
}

const handleArchiveProject = async (project: Project) => {
  if (!project.id) return
  
  const action = project.is_archive ? 'unarchive' : 'archive'
  if (!confirm(`Are you sure you want to ${action} this project?`)) return

  try {
    archivingProjects.value.add(project.id)
    
    const response = await projectsApi.archiveProject(project.id)
    if (response.success) {
      // Update the project in the list
      const projectIndex = projects.value.findIndex((p) => p.id === project.id)
      if (projectIndex !== -1) {
        projects.value[projectIndex] = response.data
      }
      alert(`Project ${action}d successfully!`)
    } else {
      throw new Error(response.message || `Failed to ${action} project`)
    }
  } catch (err) {
    console.error(`Error ${action}ing project:`, err)
    alert(`Error ${action}ing project: ${(err as Error).message}`)
  } finally {
    archivingProjects.value.delete(project.id)
  }
}

const handleMemberChanged = () => {
  // Optionally refresh projects list or update member count
  // For now, just log the action
  console.log('Member list changed')
}

// Fetch projects on component mount
onMounted(() => {
  fetchProjects()
})
</script>
