import { getOrders } from "../api/orders";
import { ref } from '../config/constants'

export const RECIVE_ORDERS = 'RECIVE_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const EDIT_ORDER = 'EDIT_ORDER'
export const INIT_ORDER_WATCH = 'INIT_ORDER_WATCH'

function handleOrders(orders){
  return {
    type: RECIVE_ORDERS,
    orders
  }
}

function addOrder (order) {
  return {
    type: ADD_ORDER,
    order
  }
}

function editOrder (order) {
  return {
    type: EDIT_ORDER,
    order
  }
}


export function watchOrders(watch) {
  return {
    type: INIT_ORDER_WATCH,
    watch
  }
}

export function reviceOrders(){
  return (dispatch) => {
    return getOrders('assign')
      .then(orders => {
        return dispatch(handleOrders(orders))
      })
  }
}

export function reciveInitialOrders(){
  return (dispatch) => {
    return Promise.all([dispatch(reviceOrders())])
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
        console.log('edit:', snap.val())
        dispatch(editOrder(snap.val()))
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
