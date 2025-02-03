import axios from 'axios';
import { API_URL } from '../utils/constants';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users`, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};

export const promoteUser = async (userId) => {
  const response = await axios.patch(
    `${API_URL}/admin/users/${userId}/promote`,
    {},
    {
      headers: { ...getAuthHeaders() },
    }
  );
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};
