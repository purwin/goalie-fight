import * as firebase from 'firebase'
import * as datumAll from '../data/ALL/stats_2018_ALL.json'
import * as datum5v5 from '../data/5v5/stats_2018_5v5.json'
import * as datum4v5 from '../data/4v5/stats_2018_4v5.json'

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
datumAll.default.forEach((item, i) => {
  // Add goalie name, id to list array
  database.ref(`2018/ALL/goalies/${item.id}_${item.team.toLowerCase()}`)
    .set({
      id: item.id,
      ...item
    });
  
    database.ref(`2018/options/${item.id}_${item.team.toLowerCase()}`).set({
      id: item.id,
      name: item.name,
      team: item.team
    });
});

// Loop over data, populate arrays
datum5v5.default.forEach((item, i) => {
  // Add goalie name, id to list array
  database.ref(`2018/5v5/goalies/${item.id}_${item.team.toLowerCase()}`)
    .set({
      id: item.id,
      ...item
    });
});

// Loop over data, populate arrays
datum4v5.default.forEach((item, i) => {
  // Add goalie name, id to list array
  database.ref(`2018/4v5/goalies/${item.id}_${item.team.toLowerCase()}`)
    .set({
      id: item.id,
      ...item
    });
});