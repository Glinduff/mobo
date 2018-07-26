import { loginService } from "../api/auth";
import { setLocalCredentials, removeLocalCredentials } from "../config/localStorage";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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
          return res.status === 401 ?
           new Error('Error', 'Error') : 
           { 
            status: 'success' , 
            setCredentials: (email, password) => setLocalCredentials(email, password),
            dispatchAuth: (val) => dispatch(setAuth(val))
          }
      })
  }
}
