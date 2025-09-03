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

export interface Board {
  id: string
  title: string
}

export interface CreateBoardRequest {
  title: string
}

export interface Board {
  id: string
  title: string
  description?: string
  coverUrl?: string
  assigned?: string
  is_archive?: boolean
}

export interface CreateBoardRequest {
  title: string
  description?: string
}

export interface UpdateBoardRequest {
  title?: string
  description?: string
  coverUrl?: string
  assigned?: string
  is_archive?: boolean
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

  async getBoards(projectId: string): Promise<ApiResponse<Board[]>> {
    const response = await $get(`/projects/${projectId}/boards`)
    return response.data
  },

  async createBoard(projectId: string, boardData: CreateBoardRequest): Promise<ApiResponse<Board>> {
    const response = await $post(`/projects/${projectId}/boards`, boardData)
    return response.data
  },

  async getBoardById(boardId: string): Promise<ApiResponse<Board>> {
    const response = await $get(`/boards/${boardId}`)
    return response.data
  },

  async updateBoard(boardId: string, data: UpdateBoardRequest): Promise<ApiResponse<Board>> {
    const response = await $put(`/boards/${boardId}`, data)
    return response.data
  },

  async archiveBoard(boardId: string): Promise<ApiResponse<Board>> {
    const response = await $patch(`/boards/${boardId}/archive`)
    return response.data
  },

  async sortBoardLists(
    boardId: string,
    sortedListIds: string[],
  ): Promise<ApiResponse<{ id: string }[]>> {
    const response = await $patch(`/boards/${boardId}/lists/sort`, { sortedListIds })
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
