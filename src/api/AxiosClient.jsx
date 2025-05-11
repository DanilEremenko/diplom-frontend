// src/api/axiosClient.js
import axios from 'axios';

const BASE_URL = 'http://91.105.199.248:8080/api/v1';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// --- Token Helpers ---
const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setTokens = ({ accessToken, refreshToken }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// --- Request Interceptor: Add access token ---
axiosClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- Response Interceptor: Handle 401 & refresh ---
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            getRefreshToken()
        ) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(
                    `${BASE_URL}/auth/refresh-token/`,
                    { refreshToken: getRefreshToken() },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const { accessToken, refreshToken } = refreshResponse.data;
                setTokens({ accessToken, refreshToken });

                // Обновим заголовки и повторим исходный запрос
                axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                clearTokens();
                window.location.href = '/login'; // редирект при неудаче
                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);

// --- Background token refresh every 3 minutes ---
setInterval(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;

    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token/`, {
            refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        setTokens({ accessToken, refreshToken: newRefreshToken });
    } catch {
        clearTokens();
    }
}, 3 * 60 * 1000); // 3 минуты

export default axiosClient;
