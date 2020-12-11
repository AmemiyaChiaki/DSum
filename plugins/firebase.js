import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyD4vbUnUk_f4JKE9KzANDzxThOk6Sv7O50",
    authDomain: "sotsusum.firebaseapp.com",
    databaseURL: "https://sotsusum.firebaseio.com",
    projectId: "sotsusum",
    storageBucket: "sotsusum.appspot.com",
    messagingSenderId: "340809501489",
    appId: "1:340809501489:web:7f828939ed47d007303e10",
    measurementId: "G-PVW8DD4X11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase
