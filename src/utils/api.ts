// src/utils/api.ts

import axios from 'axios';
import { Product, Category, User } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

if (!API_BASE_URL) {
    console.error("[CONFIG ERROR] NEXT_PUBLIC_API_BASE_URL chưa được định nghĩa. Vui lòng kiểm tra file .env.local");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  // QUAN TRỌNG: Tuyệt đối không để headers 'Content-Type' mặc định ở đây.
  // Điều này cho phép trình duyệt tự động thêm 'boundary' khi gửi FormData (upload ảnh)
  // và tự động dùng 'application/json' khi gửi Object thông thường.
});

// Interceptor 1: Thêm Bearer Token tự động từ localStorage cho các yêu cầu quản trị
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
    console.error("[AXIOS ERROR] Lỗi Request:", error.message);
    return Promise.reject(error);
  }
);

// Interceptor 2: Xử lý lỗi phản hồi và Log chi tiết để dễ dàng debug lỗi 400/500
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Lỗi từ server (có status code như 400, 401, 500)
      console.error(
        "[API ERROR] Mã lỗi:", 
        error.response.status, 
        "| Endpoint:", 
        error.config.url, 
        "| Chi tiết:", 
        error.response.data
      );
    } else if (error.request) {
      // Lỗi mạng hoặc lỗi CORS (Không nhận được phản hồi)
      console.error("[API ERROR] KHÔNG CÓ PHẢN HỒI từ server. Kiểm tra API URL:", API_BASE_URL);
    } else {
      console.error("[API ERROR] Lỗi Request Setup:", error.message);
    }
    return Promise.reject(error);
  }
);


// --- API CLIENTS ---
export const authApi = {
    login: async (credentials: any): Promise<{ access_token: string }> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (data: any): Promise<User> => {
        const response = await api.post('/users', data);
        return response.data;
    }
};

export const productApi = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },
    getById: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    create: async (data: FormData): Promise<Product> => {
        // Axios tự nhận diện FormData và cấu hình header 'multipart/form-data' kèm boundary phù hợp
        const response = await api.post('/products', data);
        return response.data;
    },
    update: async (id: string, data: FormData): Promise<Product> => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    }
};

export const categoryApi = {
    getAll: async (): Promise<Category[]> => {
        const response = await api.get('/categories');
        return response.data;
    },
    getById: async (id: string): Promise<Category> => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },
    create: async (data: any): Promise<Category> => {
        const response = await api.post('/categories', data);
        return response.data;
    },
    update: async (id: string, data: any): Promise<Category> => {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/categories/${id}`);
    }
};

export default api;