import api, {headers, formHeaders} from "./api.js"
 
export const searchNotes = async (searchTerm)=>{
  const response = await api.get(`/user/notes/search?q=${searchTerm}`, {headers})
  return response.data
}

export const getNotes = async (page=1, sort="views")=>{
  const response = await api.get(`/user/notes/?page=${page},sort=${sort}`, {headers} )
  return response.data
}
export const getNote = async (noteId)=>{
  const response = await api.get(`/user/notes/note/${noteId}`, {headers} )
  return response.data
}

export const updateNote = async (noteId, data) =>{
  const response = await api.put(`/user/notes/${noteId}`, data, {headers} )
  return response.data
}
export const updateNoteViewCount = async (noteId) =>{
  const response = await api.patch(`/user/notes/note/${noteId}`, {headers} )
  return response.data
}
export const deleteNote = async (noteId,photoId) =>{
  const response = await api.delete(`/user/notes/note/${noteId}/${photoId}`, {headers})
  return response.data

}

export const addNotes = async(data) =>{
  try {
    const response = await api.post("/user/notes", data, {headers : formHeaders})
    return response.data
  } catch (error) {
    console.log("Error in add note api: ", error)
    throw error
  }
}
