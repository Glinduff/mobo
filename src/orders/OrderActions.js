import { getAsOrders, getNasOrders } from "../api/orders";
import { ref } from '../config/constants'

export const RECIVE_ASSIGNED_ORDERS = 'RECIVE_ASSIGNED_ORDERS'
export const RECIVE_NOT_ASSIGNED_ORDERS = 'RECIVE_NOT_ASSIGNED_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'


function handleAssignedOrders(assignedOrders){
  return {
    type: RECIVE_ASSIGNED_ORDERS,
    assignedOrders
  }
}

function handleNotAssignedOrders(notAssignedOrders){
  return {
    type: RECIVE_NOT_ASSIGNED_ORDERS,
    notAssignedOrders
  }
}

function addOrder (order) {
  return {
    type: ADD_ORDER,
    order
  }
}

export function reviceNotAssignedOrders(){
  return (dispatch) => {
    getNasOrders()
      .then(orders => {
        dispatch(handleNotAssignedOrders(orders))
      })
  }
}

export function reviceAssignedOrders(){
  return (dispatch) => {
    getAsOrders()
      .then(orders => {
        dispatch(handleAssignedOrders(orders))
      })
  }
}

export function reciveInitialOrders(){
  return (dispatch) => {
    dispatch(reviceAssignedOrders())
  /*   dispatch(reviceNotAssignedOrders()) */
  }
}

export function addOrderListener (dispatch) {
  ref.child('/orders').on('child_added', snap => {
    console.log(snap.val())
    dispatch(addOrder(snap.val()))
  })
}
