<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosClient from '../services/axios'
import GuestLayout from '../components/GuestLayout.vue'

const router = useRouter()
const errors = ref({})

const data = ref({
    email: '',
    password: ''
});

async function login() {

    errors.value = {}

    try {
        await axiosClient.get('/sanctum/csrf-cookie')

        // Step 2: Send registration data
        await axiosClient.post('/login', data.value)

        // Navigate to Home on success
        router.push({ name: 'Home' })
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            errors.value.general = 'Invalid email or password'
        }
        else if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors
        }
        else {
            console.error('Unexpected error:', error)
        }
    }
}

</script>


<template>
    <GuestLayout>
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account
        </h2>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="login">

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" v-model="data.email" name="email" id="email" required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <div v-if="errors.email" class="text-sm text-red-600 mt-1">
                        {{ errors.email[0] }}
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                    <div class="mt-2">
                        <input type="password" v-model="data.password" name="password" id="password" required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                    <div v-if="errors.password" class="text-sm text-red-600 mt-1">
                        {{ errors.password[0] }}
                    </div>
                </div>

                <!-- Submit -->
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?
                {{ ' ' }}
                <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create an Account
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>