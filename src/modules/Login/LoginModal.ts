// src/modules/login/LoginModel.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const LoginModel = {

  validateFields: (payload: LoginRequest): { valid: boolean; error?: string } => {
    if (!payload.username || payload.username.trim() === '') {
      return { valid: false, error: 'Username is required' };
    }
    if (!payload.password || payload.password.trim() === '') {
      return { valid: false, error: 'Password is required' };
    }
    if (payload.password.length < 6) {
      return { valid: false, error: 'Password must be at least 6 characters' };
    }
    return { valid: true };
  },

  login: async (
    payload: LoginRequest
  ): Promise<{ success: boolean; data?: LoginResponse; error?: string }> => {
    try {
      console.log('📤 Sending login request with payload:', payload);
      const response = await POSTMethod<LoginResponse>(API_ENDPOINTS.LOGIN, payload);
      console.log('📥 Received login response:', response);

      if (response.success && response.data?.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user));
      }

      return response;
    } catch (error: any) {
      console.log('❌ Login request error:', error.message);
      return { success: false, error: error.message || 'Login failed' };
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo');
  },
};
