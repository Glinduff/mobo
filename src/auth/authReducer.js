import { LOGIN, LOGOUT, SET_AUTH_USER } from './AuthActions'
 

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function auth(state = initialState , action){

  switch(action.type){

    case SET_AUTH_USER:
      return {
        ...state,
        user: action.user
      }

    case LOGIN:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      }

    case LOGOUT:
      return {
        ...state,
        user: {}
      }

    default:
      return state
  }
}
