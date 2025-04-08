// stores/authStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../services/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "./userStore";

export const useAuthStore = defineStore("auth", () => {

    const userStore = useUserStore();
    const router = useRouter();

    const errors = ref({});

    async function register(data) {
        errors.value = {};

        try {
            await axiosClient.get("sanctum/csrf-cookie");
            await axiosClient.post("api/register", data);

            // Fetch authenticated user info
            const { data: user } = await axiosClient.get("api/user");
            userStore.setUser(user);

            router.push({ name: "Home" });

        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    async function login(data) {
        errors.value = {};

        try {
            await axiosClient.get("sanctum/csrf-cookie");
            await axiosClient.post("api/login", data);

            const { data: user } = await axiosClient.get("api/user");
            userStore.setUser(user);

            router.push({ name: "Home" });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    async function logout() {
        await axiosClient.post("api/logout");
        userStore.clearUser();
        router.push({ name: "Login" });
    }

    return {
        register,
        login,
        logout,
        errors,
    };
});
