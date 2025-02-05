import axios from 'axios';
import { API_URL } from '../utils/constants';

export const createGroup = async (token, groupData) => {
  const response = await axios.post(`${API_URL}/groups`, groupData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const addMemberToGroup = async (token, groupId, memberData) => {
  const response = await axios.post(
    `${API_URL}/groups/${groupId}/members`,
    memberData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const getGroupTasks = async (token, groupId) => {
  const response = await axios.get(`${API_URL}/groups/${groupId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getJoinedGroups = async (token) => {
  const response = await axios.get(`${API_URL}/groups/joined`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getGroupMembers = async (token, groupId) => {
  const response = await axios.get(`${API_URL}/groups/${groupId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
