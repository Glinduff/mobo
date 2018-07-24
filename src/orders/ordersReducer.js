import { 
  RECIVE_ASSIGNED_ORDERS, 
  RECIVE_NOT_ASSIGNED_ORDERS, 
  ADD_ORDER
} from "./OrderActions";

const initialState = {
  assigned: [],
  notAssigned: []

}

export default function orders(state=initialState, action){
  switch(action.type){
    case RECIVE_ASSIGNED_ORDERS:
      return {
        ...state,
        assigned: action.assignedOrders
      }

      case RECIVE_NOT_ASSIGNED_ORDERS:
      return {
        ...state,
        notAssigned: action.notAssignedOrders
      }

      case ADD_ORDER: {
        return {
          ...state,
          notAssigned: [...state.notAssigned, action.order]
        }
      }

    default:
      return state;
  }
}