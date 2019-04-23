import * as firebase from 'firebase'
import * as datum from '../data/stats_2018_5v5.json'

const config = {
  apiKey: "AIzaSyAYtsSeh9Wx699FbJ3E_cen4P86XKjU_hA",
  authDomain: "goalie-fight-6413e.firebaseapp.com",
  databaseURL: "https://goalie-fight-6413e.firebaseio.com",
  projectId: "goalie-fight-6413e",
  storageBucket: "goalie-fight-6413e.appspot.com",
  messagingSenderId: "849288500073"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref()
  .once('value')
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  }).catch(e => {

  });

// Loop over data, populate arrays
datum.default.forEach((item, i) => {
  // Add goalie name, id to list array
  database.ref(`2018/5v5/percentile/${i}_${item.team.toLowerCase()}`)
    .set({
      id: i,
      ...item
    });
});