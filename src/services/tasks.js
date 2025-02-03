import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const createTask = async (payload) => {
  const response = await axios.post(`${API_URL}/tasks`, payload, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return response.data;
};

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};

export const updateTask = async (id, payload) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, payload, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};

export const getAdminTasks = async () => {
  const response = await axios.get(`${API_URL}/admin/tasks`, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};

export const updateAdminTask = async (id, payload) => {
  const response = await axios.put(`${API_URL}/admin/tasks/${id}`, payload, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
  });
  return response.data;
};

export const createTaskForUser = async (taskData) => {
  try {
    const response = await axios.post('/admin/tasks', taskData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create task';
  }
};
