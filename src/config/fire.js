import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDubyoOxQMqBYcd2ajoubhk4EFlhoGOEgE",
    authDomain: "practice-939a7.firebaseapp.com",
    databaseURL: "https://practice-939a7.firebaseio.com",
    projectId: "practice-939a7",
    storageBucket: "practice-939a7.appspot.com",
    messagingSenderId: "34322182409",
    appId: "1:34322182409:web:06d8386c618593102ba3d8",
    measurementId: "G-0B47KXDT5Z"
  };

  const fire=firebase.initializeApp(config);
  export default fire;