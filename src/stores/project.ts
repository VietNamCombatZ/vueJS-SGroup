// import { defineStore } from 'pinia'
// import { ref, computed } from 'vue'
// import { http } from '../lib/http'

// export interface ProjectMember {
//   id: string
//   userId: string
//   name: string
//   email: string
//   avatarUrl?: string
//   joinedAt?: string
// }

// export interface Project {
//   id: string
//   title: string
//   description: string
//   assigned?: string | null
//   is_archive: boolean
//   projectMembers?: ProjectMember[]
//   createdAt?: string
//   updatedAt?: string
// }

// export const useProjectsStore = defineStore('projects', () => {
//   const items = ref<Project[]>([])
//   const loading = ref(false)
//   const error = ref<string | null>(null)
//   const page = ref(1)
//   const q = ref('')
//   const includeArchived = ref(false)

//   const activeProjects = computed(() => items.value.filter(p => !p.is_archive))
//   const archivedProjects = computed(() => items.value.filter(p => p.is_archive))

//   async function fetchProjects() {
//     loading.value = true
//     error.value = null
//     try {
//       const res = await http.get('/projects', { params: { page: page.value, q: q.value, includeArchived: includeArchived.value } })
//       items.value = res.data.data || res.data // flexible to backend shape
//     } catch (e: any) {
//       error.value = e?.response?.data?.message || e.message
//       throw e
//     } finally {
//       loading.value = false
//     }
//   }

//   async function fetchProject(id: string) {
//     const res = await http.get(`/projects/${id}`)
//     const p: Project = res.data.data || res.data
//     const idx = items.value.findIndex(x => x.id === p.id)
//     if (idx >= 0) items.value[idx] = p; else items.value.unshift(p)
//     return p
//   }

//   async function createProject(payload: { title: string; description: string; assigned?: string | null }) {
//     const res = await http.post('/projects', payload)
//     const p: Project = res.data.data || res.data
//     items.value.unshift(p)
//     return p
//   }

//   async function updateProject(id: string, patch: Partial<Pick<Project, 'title' | 'description' | 'assigned'>>) {
//     const res = await http.patch(`/projects/${id}`, patch)
//     const updated: Project = res.data.data || res.data
//     const idx = items.value.findIndex(x => x.id === id)
//     if (idx >= 0) items.value[idx] = { ...items.value[idx], ...updated }
//     return updated
//   }

//   async function setArchived(id: string, value: boolean) {
//     // optimistic update
//     const idx = items.value.findIndex(x => x.id === id)
//     const prev = idx >= 0 ? { ...items.value[idx] } : null
//     if (idx >= 0) items.value[idx].is_archive = value
//     try {
//       const res = await http.patch(`/projects/${id}/archive`, { is_archive: value })
//       const updated: Project = res.data.data || res.data
//       if (idx >= 0) items.value[idx] = { ...items.value[idx], ...updated }
//     } catch (e) {
//       if (idx >= 0 && prev) items.value[idx] = prev
//       throw e
//     }
//   }

//   async function deleteProject(id: string) {
//     await http.delete(`/projects/${id}`)
//     items.value = items.value.filter(p => p.id !== id)
//   }

//   // --- Members ---
//   async function fetchMembers(projectId: string) {
//     const res = await http.get(`/projects/${projectId}/members`)
//     const members: ProjectMember[] = res.data.data || res.data
//     const idx = items.value.findIndex(x => x.id === projectId)
//     if (idx >= 0) items.value[idx].projectMembers = members
//     return members
//   }

//   async function addMember(projectId: string, input: { userId?: string; email?: string }) {
//     const res = await http.post(`/projects/${projectId}/members`, input)
//     const member: ProjectMember = res.data.data || res.data
//     const idx = items.value.findIndex(x => x.id === projectId)
//     if (idx >= 0) {
//       const list = items.value[idx].projectMembers || []
//       items.value[idx].projectMembers = [member, ...list]
//     }
//     return member
//   }

//   async function removeMember(projectId: string, memberId: string) {
//     const idx = items.value.findIndex(x => x.id === projectId)
//     const prev = idx >= 0 ? [...(items.value[idx].projectMembers || [])] : []
//     if (idx >= 0) items.value[idx].projectMembers = prev.filter(m => m.id !== memberId)
//     try {
//       await http.delete(`/projects/${projectId}/members/${memberId}`)
//     } catch (e) {
//       if (idx >= 0) items.value[idx].projectMembers = prev // rollback
//       throw e
//     }
//   }

//   async function searchUsers(q: string) {
//     const res = await http.get('/users/search', { params: { q } })
//     return res.data.data || res.data
//   }

//   return {
//     items, loading, error, page, q, includeArchived, activeProjects, archivedProjects,
//     fetchProjects, fetchProject, createProject, updateProject, setArchived, deleteProject,
//     fetchMembers, addMember, removeMember, searchUsers,
//   }
// })
