import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAYtsSeh9Wx699FbJ3E_cen4P86XKjU_hA",
  authDomain: "goalie-fight-6413e.firebaseapp.com",
  databaseURL: "https://goalie-fight-6413e.firebaseio.com",
  projectId: "goalie-fight-6413e",
  storageBucket: "goalie-fight-6413e.appspot.com",
  messagingSenderId: "849288500073"
};

firebase.initializeApp(config);

firebase.database().ref().set({
	party: 'on'
});