import { getDrivers } from "../api/dirvers";
import { ref } from '../config/constants'

export const REVICE_DRIVERS = 'REVICE_DRIVERS'
export const INIT_DRIVERS_WATCH = 'INIT_DRIVERS_WATCH'

function handledReviceDrivers(drivers) {
  return {
    type: REVICE_DRIVERS,
    drivers
  }
}

export function watchDrivers(watch) {
  return {
    type: INIT_DRIVERS_WATCH,
    watch
  }
}


export function reciveDrivers(){
  return (dispatch) => {
    return getDrivers()
      .then(drivers => dispatch(handledReviceDrivers(drivers)))
  }
}


export function initWatchDrivers () {
  return (dispatch, getState) => {
    ref.child('/drivers').on('child_added', snap => {
      if (getState().drivers.watch === true) {
        dispatch(addOrder(snap.val()))
      }
    })
    ref.child('/drivers').on('child_changed', snap => {
      if (getState().drivers.watch === true) {
        console.log(snap.val())
      }
    })
    ref.child('/drivers').on('child_removed', snap => {
      if (getState().drivers.watch === true) {
        console.log(snap.val())
      }
    })

  }
}


export function endWatchDrivers () {
  return (dispatch, getState) => {
    dispatch(watchDrivers(false))
    ref.child('/drivers').off('child_added')
    ref.child('/drivers').off('child_changed')
    ref.child('/drivers').off('child_removed')
  }
}