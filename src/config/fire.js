import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBzl9kAA2EEDGD9-jVVowsQGl5MnONAlHI",
    authDomain: "itemlister-1406b.firebaseapp.com",
    databaseURL: "https://itemlister-1406b.firebaseio.com",
    projectId: "itemlister-1406b",
    storageBucket: "itemlister-1406b.appspot.com",
    messagingSenderId: "433054783100"
  };
  const fire = firebase.initializeApp(config);
  
  export default fire;