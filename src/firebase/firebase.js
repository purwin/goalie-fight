import * as firebase from 'firebase'
import * as datum from '../data/stats_2018_5v5-03.json'

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

// Loop over data, populate arrays
datum.default.forEach((item, i) => {
  // Add goalie name, id to list array
  database.ref(`2018/5v5/goalies/${i}_${item.team.toLowerCase()}`)
    .set({
      id: i,
      ...item
    });
  
    database.ref(`2018/list/${i}_${item.team.toLowerCase()}`).set({
      id: i,
      name: item.name,
      team: item.team
    });
});