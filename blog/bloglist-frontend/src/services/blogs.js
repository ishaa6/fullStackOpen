import axios from 'axios'
const baseUrl = 'http://localhost:3003'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/blogs/`)
  return request.then(response => response.data)
}

const login = (username, pwd) => {
    return axios
    .post(`${baseUrl}/api/login/`, {
      username: username,
      password: pwd
    })
    .then(response => response.data)
}

const postData = (title, auth, url) => {
  const body = {
    title: title,
    author: auth,
    url: url,
  }

  const header = {
    'Authorization': token
  }
  return axios
  .post(`${baseUrl}/api/blogs/`, body, {headers: header})
  .then(response => response.data )
  .catch(error => console.log("Error: ", error))
}

const updateData = (id, likes) => {
  const header = {'Authorization': token}
  return axios
  .put(`${baseUrl}/api/blogs/${id}/`, {likes}, {headers: header})
  .then(response => response.data)
  .catch(error => console.log(error))  
}

const deleteData = (id) => {
  const header = {'Authorization': token}
  return axios
  .delete(`${baseUrl}/api/blogs/${id}/`, {headers: header})
}

export default { 
  getAll,
  login,
  setToken,
  postData,
  updateData,
  deleteData
 }