import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8080';

export const requseLogin = params => {
  return axios.post('http://localhost:8081/login', params);
}

// export const addTrade = params => {
//   return axios.post('/trader/submit', params);
// } 

export const addTrade = params => {
  return axios.post('http://127.0.0.1:8080/create/createTrade', params);
}