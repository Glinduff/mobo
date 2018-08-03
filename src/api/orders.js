import { ref } from "../config/constants";

export function getOrders(type){
  return ref.child('/orders')
    .once('value')
    .then(snap => {
      return Object
        .keys(snap.val())
        .map(elem => snap.val()[elem])
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