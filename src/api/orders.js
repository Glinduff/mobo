import { ref } from "../config/constants";
import axios from "axios";
import base64 from "base-64";
import { store } from "../index"
import { API_PATH } from "../config/constants";


export function getOrders(){
  return ref.child('/orders')
    .once('value')
    .then(snap => {
      return Object
        .keys(snap.val())
        .map(elem => snap.val()[elem])
    })
}

export function getOrder(orderId){
  const {user: {email, password}} = store.getState().auth;
  return axios.get(`${API_PATH}/service/detail/${orderId}`, {
    headers: {
      'Authorization': 'Basic ' + base64.encode(`${email}:${password}`),
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.status === 200 && res.data.data)
  .catch(error => error.response.status === 401 && trowNewError('Usuario no autorizado'))
}


/* export function filterAssignOrders(orders){
  return Object
  .keys(orders)
  .filter(elem => orders[elem].assignment)
  .map(elem => orders[elem])
}

export function filterNotAssignOrders(orders){
  return Object
  .keys(orders)
  .filter(elem => !orders[elem].assignment)
  .map(elem => orders[elem])
} */