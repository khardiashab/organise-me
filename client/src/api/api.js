import axios from "axios";

const api = axios.create({
  baseURL : 'http://localhost:5555/api'
}) 
export default api

export const headers = {
  'Content-Type' : 'application/json',
  Authorization : 'Bearer ' + localStorage.getItem("authToken")
}

export const formHeaders = {
  'Content-Type' : 'multipart/form-data',
  Authorization : 'Bearer ' + localStorage.getItem("authToken")
}


