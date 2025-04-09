import { defineStore } from "pinia";
import axiosClient from "../services/axios";

export const useImageStore = defineStore("imageStore", {
    state: () => ({
        images: [],
        loading: false,
    }),
    actions: {
        async fetchImages() {
            this.loading = true;
            try {
                const response = await axiosClient.get("api/images");
                this.images = response.data;
            } catch (error) {
                console.error("Failed to fetch images:", error);
            } finally {
                this.loading = false;
            }
        },

        async addImage(formData) {
            try {
                await axiosClient.post("api/images", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
            } catch (error) {
                console.error("Upload failed:", error);
            }
        },

        async deleteImage(id) {
            try {
                await axiosClient.delete(`api/images/${id}`);
                this.images = this.images.filter((img) => img.id !== id);
            } catch (error) {
                console.error("Delete failed:", error);
            }
        },
    },
});
