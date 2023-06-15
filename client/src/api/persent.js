import api, { headers } from "./api.js";
 export const getTodayPersent = async () => {
  try {
    const response = await api.get("/user/persent", { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting today's percentage:", error);
    throw error;
  }
};
 export const updatePersent = async () => {
  try {
  
    const response = await api.put(
      `/user/persent/`, {},
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating percentage:", error);
    throw error;
  }
};
 export const getPersent = async (date) => {
  try {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const response = await api.get(`/user/persent/query?day=${day}&month=${month}&year=${year}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting percentage:", error);
    throw error;
  }
};