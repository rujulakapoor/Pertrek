import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCo2jQsAah3JNZV6DJOxpAN9toSyuTJrhc",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
  };

  const fire=firebase.initializeApp(config);
  export default fire;