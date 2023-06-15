import api from "./api.js";

export const registeration = async(data)=>{
  const response = await  api.post("/auth/register" , data)
  return  response.data
}

export const login = async(data)=>{
  const response = await api.post("/auth/login" , data)
  return  response.data
}
