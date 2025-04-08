<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GuestLayout from '../components/GuestLayout.vue'
import { useAuthStore } from '../stores/authStore'
import { useUserStore } from '../stores/userStore'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const errors = ref({})
const data = ref({
    email: '',
    password: ''
})

async function login() {
    errors.value = {}

    try {
        await authStore.login(data.value)
        await userStore.getUser()
        router.push({ name: 'Home' })
    } catch (error) {
        if (error.response?.status === 401) {
            errors.value.general = 'Invalid email or password'
        } else if (error.response?.status === 422) {
            errors.value = error.response.data.errors
        } else {
            console.error('Unexpected error:', error)
        }
    }
}
</script>

<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="login">
                <div v-if="errors.general" class="mt-4 py-2 px-3 rounded text-white bg-red-400">{{ errors.general }}</div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" v-model="data.email" id="email" required
                            class="block w-full rounded-md border px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-indigo-600" />
                    </div>
                    <div v-if="errors.email" class="mt-4 py-2 px-3 rounded text-white bg-red-400">{{ errors.email[0] }}</div>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <input type="password" v-model="data.password" id="password" required
                            class="block w-full rounded-md border px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:outline-indigo-600" />
                    </div>
                    <div v-if="errors.password" class="mt-4 py-2 px-3 rounded text-white bg-red-400">{{ errors.password[0] }}</div>
                </div>

                <!-- Submit -->
                <div class="mt-4">
                    <button type="submit"
                        class="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create an account
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>
