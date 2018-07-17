export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function handleLogin(isAuthenticated) {
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