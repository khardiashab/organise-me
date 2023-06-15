import axios, {headers} from "./api";

 const getLocation = async () => {
  try {
    const response = await axios.get("/user/location", { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 const updateLocation = async (data) => {
  try {
    const response = await axios.put("/user/location", data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 const deleteLocation = async () => {
  try {
    const response = await axios.delete("/user/location", { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 const createLocation = async (data) => {
  try {
    const response = await axios.post("/user/location", data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 export  { getLocation, updateLocation, deleteLocation, createLocation };