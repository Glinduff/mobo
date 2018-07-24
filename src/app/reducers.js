import { combineReducers } from 'redux'
import auth from '../auth/authReducer'
import orders from "../orders/ordersReducer";

export default combineReducers({
  auth,
  orders
})