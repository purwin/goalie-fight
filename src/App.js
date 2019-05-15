import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'
import WebFont from 'webfontloader';

import Header from './components/Header'
import Display from './components/Display'
import './firebase/firebase'
import './App.css'

library.add(faPlus) // + SVG icon
library.add(faTimes) // X SVG icon

WebFont.load({
  google: {
    families: ['Noto Sans', 'Roboto Mono']
  }
});

const database = firebase.database();

const defaultState = {
  data: undefined,
  stats: [
    {},
  ],
  time: `2018`,
  situation: `ALL`,
  goalies: [
    {
      id: undefined,
      name: ``,
      team: ``
    },
  ],
  activeGoalie: undefined,
  goalieList: []
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState
    };

    this.addGoalie = this.addGoalie.bind(this);
    this.pullGoalie = this.pullGoalie.bind(this);
    this.changeGoalie = this.changeGoalie.bind(this);

    this.setSituation = this.setSituation.bind(this);
    this.setActiveGoalie = this.setActiveGoalie.bind(this);

    this.getStatDB = this.getStatDB.bind(this);
    this.getGoalieOptions = this.getGoalieOptions.bind(this);

    this.resetState = this.resetState.bind(this);
  }

    // Add goalie to this.state.goalies
    addGoalie = (goalie = {}) => {
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.concat(goalie),
          stats: prevState.stats.concat(goalie),
        }
      })
    };

    // Remove goalie from this.state.goalies
    pullGoalie = index => {
      this.setState(prevState => {
        // Filter pulled goalie out of goalie list
        const newGoalies = prevState.goalies.filter((goalie, i) => index !== i);

        // Define goalie ID to compare against activeGoalie
        const pulledGoalieID = `${prevState.goalies[index].id}_${prevState.goalies[index].team}`;

        return {
          goalies: newGoalies,
          stats: prevState.stats.filter((stat, i) => index !== i),
          // If activeGoalie is removed, set to last goalie in array
          activeGoalie: prevState.activeGoalie === pulledGoalieID ? `${newGoalies[newGoalies.length - 1].id}_${newGoalies[newGoalies.length - 1].team}` : prevState.activeGoalie
        }
      })
    };

    // Set goalie to a new obj value
    changeGoalie = (index, newGoalie) => {
      this.getStatDB(newGoalie).then(data => {
        console.log(data);

        this.setState(prevState => {
          return {
            goalies: prevState.goalies.map((goalie, i) => (
              (index === i) ? newGoalie : goalie
            )),
            stats: prevState.stats.map((stat, i) => (
              (index === i) ? data : stat
            ))
          }
        })

      });

    };

    // Function to set state.situation and update data to reflect new value
    setSituation = val => {
      // Do nothing if selected situation is already set
      if (this.state.situation === val) {
        return
      }
      // Set state.situation w/ passed arg
      this.setState({
        situation: val
      }, () => {
        this.state.goalies.forEach((goalie, i) => {
          // Call changeGoalie if goalie has defined properties to get new data
          goalie.name && this.changeGoalie(i, goalie);
        });
      })

    };


    // Function to set state.activeGoalie
    // Called when new goalie is added to the chart or selected from Stats component
    setActiveGoalie = ({id, team}) => {
      // Set unique value
      const val = `${id}_${team}`;

      console.log(`Active goalie: ${val}`);

      // If goalie is not currently active, set state
      if (val !== this.state.activeGoalie) {
        this.setState({
          activeGoalie: val
        });
      }
    };

    // Function that sends a request for goalie data from Firebase
    // Returns a promise with goalie data as an obj
    getStatDB = goalie => {
      return new Promise((resolve, reject) => {
        const id = `${goalie.id}_${goalie.team.toLowerCase()}`;
        console.log(id);

        console.log(this.state.time);
        console.log(this.state.situation);

        database.ref(`${this.state.time}/${this.state.situation}/goalies/${id}`)
          .once('value')
          .then(snapshot => {
            resolve(snapshot.val());
          }).catch(e => {
            reject(`Error: ${e}`);
          });

      });

    };

    // Function that pulls goalie options from database
    getGoalieOptions = () => {
      let stateGoalieList = [];
      
      database.ref(`${this.state.time}/options`)
        .once('value')
        .then(snapshot => {
          snapshot.forEach(item => {
            stateGoalieList.push(item.val());
          })
      
          stateGoalieList.sort((a, b) => (
            a.name > b.name ? 1 :
            (a.name < b.name ? -1 : 0)
          ))
      
          this.setState({
            goalieList: stateGoalieList
          });
        }).catch(e => {
          console.log(`Error: ${e}`);
        });
    };

    // Function to reset all state data
    resetState = () => {
      // Set default state
      this.setState({
        ...defaultState
      })

      // Call function to re-populate goalie options
      this.getGoalieOptions()
    };


    componentDidMount() {
      // Call function to populate goalie options
      this.getGoalieOptions()
    }


  render() {
    return(
      <div className="App">
        <Header />
        <Display 
          stats={this.state.stats}
          goalies={this.state.goalies}
          activeGoalie={this.state.activeGoalie}
          setActiveGoalie={this.setActiveGoalie}
          goalieList={this.state.goalieList}
          time={this.state.time}
          situation={this.state.situation}
          setSituation={this.setSituation}
          changeGoalie={this.changeGoalie}
          addGoalie={this.addGoalie}
          pullGoalie={this.pullGoalie}
          resetState={this.resetState}
        />
      </div>
    )
  }

};

export default App