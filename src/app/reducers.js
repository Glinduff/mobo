import { combineReducers } from 'redux'
import auth from '../auth/authReducer'
import drivers from '../drivers/driversReducers'
import order from "../order/orderReducer";

export default combineReducers({
  auth,
  drivers,
  order
})