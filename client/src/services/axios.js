import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    withXSRFToken: true
});

axiosClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.warn("User is not authenticated. Redirecting to login.");
            router.push('/login');
        }
        if (error.response && error.response.status === 500) {
            alert("Server error. Please try again later.");
        }

        return Promise.reject(error);
    }
);

export default axiosClient;