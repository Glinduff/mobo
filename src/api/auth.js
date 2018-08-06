import axios from "axios";
import base64 from "base-64";
import { trowNewError } from "../helpers/helpers";
import { API_PATH } from "../config/constants";


export function loginService(email, password){
  return axios.get(`${API_PATH}/auth/login`, {
    headers: {
      'Authorization': 'Basic ' + base64.encode(`${email}:${password}`),
      'Content-Type': 'application/json',
    }
  })
  .then(res => {
    console.log(res)
    if(res.status === 200){
      return {
        ...res.data.data,
        password: password
      }
    }
  })
  .catch(error => error.response.status === 401 && trowNewError('Usuario no autorizado'))
}
