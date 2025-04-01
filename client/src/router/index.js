import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import MyImages from "../pages/MyImages.vue";
import NotFound from "../pages/NotFound.vue";
import Signup from "../pages/Signup.vue";
import { useAuthStore } from "../stores/Auth";


const routes = [
    {
        path: '/',
        component: DefaultLayout,
        meta: { requiresAuth: true }, // Add meta field for protected routes
        children: [
            { path: '/', name: 'Home', component: Home },
            { path: '/images', name: 'MyImages', component: MyImages },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresGuest: true } // Add meta for guest-only routes
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: { requiresGuest: true } // Add meta for guest-only routes
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Add navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    // Check if route requires authentication
    if (to.meta.requiresAuth && !authStore.token) {
        return next({ name: 'Login' });
    }
    
    // Check if route requires guest (non-authenticated)
    if (to.meta.requiresGuest && authStore.token) {
        return next({ name: 'Home' });
    }
    
    // Continue to the route
    next();
});

export default router;