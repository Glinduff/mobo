import { combineReducers } from 'redux'
import auth from '../auth/authReducer'
import drivers from '../drivers/driversReducers'
import orders from "../orders/ordersReducer";

export default combineReducers({
  auth,
  drivers,
  orders
})