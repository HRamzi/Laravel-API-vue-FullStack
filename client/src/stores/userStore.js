import { defineStore } from 'pinia'
import axiosClient from '../services/axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        name: '',
        email: '',
    }),
    actions: {
        setUser(userData) {
            this.id = userData.id
            this.name = userData.name
            this.email = userData.email
        },
        async getUser() {
            try {
                const { data } = await axiosClient.get('api/user')
                this.setUser(data)
                return data
            } catch (error) {
                console.error('Failed to fetch user:', error)
                throw error
            }
        },
        clearUser() {
            this.id = null
            this.name = ''
            this.email = ''
        }
    }
})
