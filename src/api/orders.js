import { ref } from "../config/config";

export function getOrders(){
  return ref.child('/orders')
    .once('value')
    .then(snap => {
      return filterNotAssignOrders(snap.val())
    })
}

function filterAssignOrders(orders){
  return Object
  .keys(orders)
  .filter(elem => orders[elem].assignment)
  .map(elem => orders[elem])
}

function filterNotAssignOrders(orders){
  return Object
  .keys(orders)
  .filter(elem => !orders[elem].assignment)
  .map(elem => orders[elem])
}