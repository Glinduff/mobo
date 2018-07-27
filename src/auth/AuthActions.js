import { loginService } from "../api/auth";
import { setLocalCredentials, removeLocalCredentials } from "../config/localStorage";
import { trowNewError } from "../helpers/helpers";

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


export function setAuthUser(user){
  return {
    type: SET_AUTH_USER,
    user
  }
}


export function setAuth(isAuthenticated) {
  return{
    type: LOGIN,
    isAuthenticated
  }
}


export function logout(isAuthenticated) {
  return{
    type: LOGOUT,
    isAuthenticated
  }
}


export function handleLogout(val){
  return (dispatch) => {
    dispatch(logout(val)),
    removeLocalCredentials()
  }
}

export function handleLogin(email, password) {
  return (dispatch) => {
    return loginService(email, password)
      .then((res) => {
        setLocalCredentials(email, password)
        return dispatch(setAuthUser(res))
      })
      .catch(() => trowNewError('Usuarios no autorizado'))
  }
}