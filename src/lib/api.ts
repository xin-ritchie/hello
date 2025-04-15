import { User } from '@/models/User';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  user?: T;
}

export const api = {
  // 用户注册
  async register(data: RegisterData): Promise<ApiResponse> {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 用户登录
  async login(data: LoginData): Promise<ApiResponse> {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 获取用户信息
  async getUser(userId: string): Promise<ApiResponse> {
    const response = await fetch(userId ? `/api/user/${userId}` : '/api/users');
    return response.json();
  },

  // 更新用户信息
  async updateUser(userId: string, data: UpdateUserData): Promise<ApiResponse> {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // 删除用户
  async deleteUser(userId: string): Promise<ApiResponse> {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};