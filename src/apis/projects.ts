import { $post, $get, $put, $patch, $delete } from './axios.client'
import type { ApiResponse } from './apiResponse'

export interface Project {
  id?: string
  title: string
  description: string
  assigned?: string
  is_archive?: boolean
}

export interface CreateProjectRequest {
  title: string
  description: string
  assigned?: string
}

export interface AddMemberRequest {
  userId: string
}

export interface ProjectMember {
  id: string
  userId: string
  projectId: string
  role: string
}

export const projectsApi = {
  async createProject(projectData: CreateProjectRequest): Promise<ApiResponse<Project>> {
    const response = await $post('/projects', projectData)
    return response.data
  },

  async getProjects(): Promise<ApiResponse<Project[]>> {
    const response = await $get('/projects')
    return response.data
  },

  async updateProject(
    projectId: string,
    projectData: Partial<CreateProjectRequest>,
  ): Promise<ApiResponse<Project>> {
    const response = await $put(`/projects/${projectId}`, projectData)
    return response.data
  },

  async archiveProject(projectId: string): Promise<ApiResponse<Project>> {
    const response = await $patch(`/projects/${projectId}/archive`)
    return response.data
  },

  async addMemberToProject(
    projectId: string,
    memberData: AddMemberRequest,
  ): Promise<ApiResponse<ProjectMember>> {
    const response = await $post(`/projects/${projectId}/members`, memberData)
    return response.data
  },

  async deleteMemberFromProject(
    projectId: string,
    userId: string,
  ): Promise<ApiResponse<ProjectMember>> {
    const response = await $delete(`/projects/${projectId}/members/${userId}`)
    return response.data
  },
}
