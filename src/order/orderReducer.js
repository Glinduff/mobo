import { 
  RECIVE_ORDERS, 
  ADD_ORDER,
  EDIT_ORDER,
  INIT_ORDER_WATCH
} from "./OrderActions";

const initialState = {
  list: [],
  watch: false
}

export default function order(state=initialState, action){
  switch(action.type){
    case RECIVE_ORDERS:
      return {
        ...state,
        list: action.orders
      }


      case ADD_ORDER: {
        return {
          ...state,
          list: state.list.concat(action.order)
        }
      }

      case EDIT_ORDER: {
        return {
          ...state,
          list: Object.assign(state.list, state.list.map(order=> order.service_id === action.order.service_id ? action.order : order))
        }
      }

      case INIT_ORDER_WATCH: {
        return {
          ...state,
          watch: action.watch
        }
      }

    default:
      return state;
  }
}