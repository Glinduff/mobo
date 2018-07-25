import { REVICE_DRIVERS } from './DriversActions'


const initialState = {
  driversList: [],
  watch: false
}

export default function drivers(state = initialState, action){
  switch(action.type){

    case REVICE_DRIVERS : {
      return {
        ...state,
        driversList: action.drivers
      }
    }

    default: 
      return state

  }
}