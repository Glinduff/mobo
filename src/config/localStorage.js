import base64 from "base-64";

export const UMP = 'UMP'
export const PMP = 'PMP'

function codeStringValue(value) {
  return base64.encode(value);
}

function decodeStringValue(value) {
  return base64.decode(value);
}

export function setLocalCredentials(email, password){
  localStorage.setItem(UMP, codeStringValue(email))
  localStorage.setItem(PMP, codeStringValue(password))
}

export function removeLocalCredentials(){
  localStorage.removeItem(UMP);
  localStorage.removeItem(PMP);
}

export function getLocalCredentials(){
  return Promise
    .all([localStorage.getItem(UMP), localStorage.getItem(PMP)])
    .then(([email, password]) => { 
      if(email === null ||password === null){
        return null
      }
      else {
        return {
          email: decodeStringValue(email),
          password: decodeStringValue(password)
        }
      }
    })
}