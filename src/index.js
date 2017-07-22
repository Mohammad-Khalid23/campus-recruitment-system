import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'

//   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdi30dqvP75rdLZhlpl04BjlJGB3GDzLc",
    authDomain: "campuse-recruiment-system.firebaseapp.com",
    databaseURL: "https://campuse-recruiment-system.firebaseio.com",
    projectId: "campuse-recruiment-system",
    storageBucket: "campuse-recruiment-system.appspot.com",
    messagingSenderId: "635307527115"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App /> , document.getElementById('root'));
registerServiceWorker();

