<script setup>
import { onMounted, computed } from 'vue'
import { useImageStore } from '../stores/imageStore'

const imageStore = useImageStore()

// use the store's images as a computed property
const images = computed(() => imageStore.images)

// fetch images on mount
onMounted(() => {
    imageStore.fetchImages()
})
</script>

<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">My Images</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div v-for="image in images" :key="image.id" class="bg-white border rounded-lg overflow-hidden shadow">
                    <img :src="image.url" alt="image" class="w-full h-48 object-contain" />
                    <div class="px-4 py-4">
                        <h3 class="text-lg font-semibold text-gray-900">
                            {{ image.label }}
                        </h3>
                        <p class="text-sm text-gray-500 mb-4">{{ image.label }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
