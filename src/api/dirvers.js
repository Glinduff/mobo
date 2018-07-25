import { ref } from "../config/constants";

export function getDrivers(){
  return ref.child('/drivers')
    .once('value')
    .then(snap => {
      return snap.val()
    })
}

