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
    .catch(error => {
      console.log(error)
      return null
    })
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
  .then(() => console.log("Data Posted"))
  .catch(error => console.log("Error: ", error))
}

export default { 
  getAll,
  login,
  setToken,
  postData
 }