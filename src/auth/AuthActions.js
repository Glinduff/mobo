
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(isAuthenticated) {
  return{
    type: LOGIN,
    isAuthenticated
  }
}

export function handleLogout(isAuthenticated) {
  return{
    type: LOGOUT,
    isAuthenticated
  }
}


export function handleLogin() {
  return (dispatch) => {
    return servicio()
      .then((user) => dispatch(login(user)))
  }
}