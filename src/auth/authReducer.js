import { LOGIN, LOGOUT } from './AuthActions'
 

const initialState = {
  isAuthenticated: true
}

export default function auth(state = initialState , action){

  switch(action.type){

    case LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }

    default:
      return state
  }
}
