export default function auth(state = {}, action){

  switch(action.type){

    case 'LOGIN':
      return action.IsAuth

    case 'LOGOUT':
      return action.IsAuth

    default:
      return state
  }
}
