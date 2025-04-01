import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)

    // Initialize axios with base URL
    const api = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            'Accept': 'application/json',
        }
    })

    // Add request interceptor to include token
    api.interceptors.request.use(config => {
        if (token.value) {
            config.headers.Authorization = `Bearer ${token.value}`
        }
        return config
    })

    async function login(credentials) {
        try {
            const response = await api.post('/login', credentials)
            user.value = response.data.user
            token.value = response.data.token
            localStorage.setItem('token', response.data.token)
            router.push({ name: 'Home' })
        } catch (error) {
            throw error.response.data.message || 'Login failed'
        }
    }

    async function register(userData) {
        try {
            const response = await api.post('/register', userData)
            user.value = response.data.user
            token.value = response.data.token
            localStorage.setItem('token', response.data.token)
            router.push({ name: 'Home' })
        } catch (error) {
            throw error.response.data.message || 'Registration failed'
        }
    }

    async function logout() {
        try {
            await api.post('/logout')
            user.value = null
            token.value = null
            localStorage.removeItem('token')
            router.push({ name: 'Login' })
        } catch (error) {
            throw error.response.data.message || 'Logout failed'
        }
    }

    return { user, token, login, register, logout }
})