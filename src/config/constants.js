var firebase = require('firebase/app');
require('firebase/database');

const config = {
  apiKey: "AIzaSyAzYfcnznCX4dxzBipVF1FIMxJX9zZNS9M",
  authDomain: "taxi-app-10a1a.firebaseapp.com",
  databaseURL: "https://taxi-app-10a1a.firebaseio.com",
  projectId: "taxi-app-10a1a",
  storageBucket: "taxi-app-10a1a.appspot.com",
  messagingSenderId: "607834333167"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()

export const firebaseAuth = firebase.auth

export const API_PATH = 'http://moov.beenary.cl/platform'
