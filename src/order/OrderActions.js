import { getOrders } from "../api/orders";
import { ref } from '../config/constants'

export const RECIVE_ASSIGNED_ORDERS = 'RECIVE_ASSIGNED_ORDERS'
export const RECIVE_NOT_ASSIGNED_ORDERS = 'RECIVE_NOT_ASSIGNED_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const INIT_ORDER_WATCH = 'INIT_ORDER_WATCH'

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


export function watchOrders(watch) {
  return {
    type: INIT_ORDER_WATCH,
    watch
  }
}

export function reviceNotAssignedOrders(){
  return (dispatch) => {
    return getOrders()
      .then(orders => {
        return dispatch(handleNotAssignedOrders(orders))
        
      })
  }
}

export function reviceAssignedOrders(){
  return (dispatch) => {
    return getOrders('assign')
      .then(orders => {
        return dispatch(handleAssignedOrders(orders))
      })
  }
}

export function reciveInitialOrders(){
  return (dispatch) => {
    return Promise.all([dispatch(reviceAssignedOrders()), dispatch(reviceNotAssignedOrders())])
      .then(orders => { 
        return orders
    });
  }
}

export function initWatchOrders () {
  return (dispatch, getState) => {
    ref.child('/orders').on('child_added', snap => {
      if (getState().order.watch === true) {
        dispatch(addOrder(snap.val()))
      }
    })
    ref.child('/orders').on('child_changed', snap => {
      if (getState().order.watch === true) {
        console.log(snap.val())
      }
    })
    ref.child('/orders').on('child_removed', snap => {
      if (getState().order.watch === true) {
        console.log(snap.val())
      }
    })

  }
}


export function endWatchOrders () {
  return (dispatch, getState) => {
    dispatch(watchOrders(false))
    ref.child('/orders').off('child_added')
    ref.child('/orders').off('child_changed')
    ref.child('/orders').off('child_removed')
  }
}
