import axios from "axios";
import base64 from "base-64";

const API_PATH = 'http://moov.beenary.cl/platform'

export function loginService(username, password){
  return axios.get(`${API_PATH}/auth/login`, {
      headers: {
         'Authorization': 'Basic ' + base64.encode(`nh@beenary.cl:123456`),
         'Content-Type': 'application/json',
        }
    })
    .then(res => console.log(res))
}
