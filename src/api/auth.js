import axios from "axios";
import base64 from "base-64";

const API_PATH = 'http://moov.beenary.cl/platform'

export function loginService(email, password){
  return axios.get(`${API_PATH}/auth/login`, {
    headers: {
      'Authorization': 'Basic ' + base64.encode(`${email}:${password}`),
      'Content-Type': 'application/json',
    }
  })
  .then(res => {
    if(res.status === 200){
      return {
        ...res.data.data,
        password: password
      }
    }
  })
  .catch(error => error.response)
}
