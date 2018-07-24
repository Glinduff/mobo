import { ref } from "../config/constants";

export function getAsOrders(){
  return ref.child('/orders')
    .once('value')
    .then(snap => {
      return filterAssignOrders(snap.val())
    })
}


export function getNasOrders(){
  return ref.child('/orders')
    .once('value')
    .then(snap => {
      return filterNotAssignOrders(snap.val())
    })
}


export function filterAssignOrders(orders){
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
}