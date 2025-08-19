import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as null | {
      name: string
      email: string
      avatarUrl: string
    },
  }),

  actions: {
    async fetchUser() {
      const token = localStorage.getItem('accessToken')
      console.log('accessToken:', token)

      if (!token) {
        console.warn('⚠️ No access token, skip fetching user')
        return
      }
      try {
        const response = await axios.get('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        console.log('Response from server:', response)
        const responseData = response.data.data
        console.log('Response data:', responseData)

        if (this.user == null) {
          this.user = {
            name: responseData.name,
            email: responseData.email,
            avatarUrl: responseData.avatarUrl
          }
        }
        console.log('user data before assignment:', responseData.name, responseData.email, responseData.avatarUrl)
        console.log('Thông tin user:', this.user)

      } catch (error) {
        console.error('Lỗi lấy thông tin user:', error)
        // If the token is invalid or expired, clear the user data
        localStorage.removeItem('accessToken')
        
        this.user = null
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('accessToken')
    }
  }
})
