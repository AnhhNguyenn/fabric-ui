
// src/utils/api.ts
import axios from 'axios';
import { User } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

// Ghi chú: Biến API_BASE_URL có thể không còn cần thiết nếu không còn chức năng nào gọi API.
// Tuy nhiên, chúng ta giữ lại cho chức năng đăng nhập `authApi`.
if (!API_BASE_URL) {
    console.warn("[CONFIG WARNING] NEXT_PUBLIC_API_BASE_URL is not defined. This is okay if no API calls are being made.");
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor để thêm token vào header cho các yêu cầu xác thực
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "[API ERROR]", 
        { 
          status: error.response.status, 
          url: error.config.url, 
          data: error.response.data
        }
      );
    } else {
      console.error("[NETWORK ERROR] Could not connect to API:", error.message);
    }
    return Promise.reject(error);
  }
);


// --- API CLIENTS ---
// Chỉ giữ lại authApi cho chức năng đăng nhập.
export const authApi = {
    login: async (credentials: any): Promise<{ access_token: string }> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    // Có thể giữ lại hoặc xóa nếu không có chức năng đăng ký
    register: async (data: any): Promise<User> => {
        const response = await api.post('/users', data);
        return response.data;
    }
};

// Đã loại bỏ: productApi (sử dụng src/data/products.ts)
// Đã loại bỏ: categoryApi (sử dụng src/data/categories.ts)

export default api;
