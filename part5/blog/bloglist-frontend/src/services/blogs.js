import axios from 'axios'
const baseUrl = 'http://localhost:3003'

let token = null

const setToken = (token) => {
  token = `Bearer ${token}`
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
    .catch(error => {
      console.log(error)
      return null
    })
}

export default { 
  getAll,
  login,
  setToken
 }