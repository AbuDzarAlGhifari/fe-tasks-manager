import axios from 'axios';
import { API_URL } from '@/utils/constants';

export const register = async (payload) => {
  const response = await axios.post(`${API_URL}/auth/register`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const login = async (payload) => {
  const response = await axios.post(`${API_URL}/auth/login`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
