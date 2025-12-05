// src/services/loginService.ts
import { LoginRequest, LoginResponse } from './LoginModal';
import { POSTMethod } from '../../services/api/ApiClient';
import API_ENDPOINTS from '../../services/api/endpoints';

export const loginService = {
  login: async (payload: LoginRequest): Promise<{ success: boolean; data?: LoginResponse; error?: string }> => {
    try {
      const response = await POSTMethod<LoginResponse>(API_ENDPOINTS.LOGIN, payload);
      return response;
    } catch (error: any) {
      return { success: false, error: error.message || 'Login request failed' };
    }
  },

  logout: async () => {
    // Optionally call a logout endpoint if your API supports it
  },
};
