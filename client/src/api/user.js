import axios, {headers} from "./api.js";

export const getUser = async()=>{
  try {
    const response = await axios.get("/user/", {headers})
    return response.data
  } catch (error) {
    console.log("There is an error in getting user information", error)
    throw error
  }
}