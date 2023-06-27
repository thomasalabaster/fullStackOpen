import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Obtain all blogs
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
}

// Pulls user token from parameters
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Create new blog post and attaches auth token from user
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }