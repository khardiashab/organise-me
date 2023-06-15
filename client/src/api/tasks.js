import api, { headers } from './api.js';
 export const getTodayList = async () => {
  try {
    const response = await api.get('/user/tasklist', { headers });
    return response.data;
  } catch (error) {
    console.error('Error getting today list:', error);
    throw error;
  }
};
 export const getList = async (date) => {
  try {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const response = await api.get(`/user/tasklist/query?day=${day}&month=${month}&year=${year}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error getting list:', error);
    throw error;
  }
};
 export const addTask = async (task) => {
  try {
    const response = await api.put('/user/tasklist/task', {name : task}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};
 export const updateTask = async (taskId) => {
  try {
    const response = await api.patch(`/user/tasklist/task/${taskId}`,{}, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
 export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/user/tasklist/task/${taskId}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};