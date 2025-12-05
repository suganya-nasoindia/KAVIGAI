// src/modules/login/LoginController.ts
import { useState } from 'react';
import { LoginModel, LoginRequest, LoginResponse } from './LoginModal';

export const useLoginController = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    const payload: LoginRequest = { username, password };

    const response = await LoginModel.login(payload);

    setLoading(false);

    if (!response.success) {
      setError(response.error || 'Login failed');
      return null;
    }

    return response.data!;
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    error,
    login,
  };
};
