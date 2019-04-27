import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'

import Header from './components/Header'
import Display from './components/Display'
import './firebase/firebase'
import './App.css'
import * as datum from './data/stats_2018_5v5.json'

library.add(faPlus) // + SVG icon
library.add(faTimes) // X SVG icon

const database = firebase.database();

// Define list of goalies
let goalieList = [];

// Define all goalie stats
let goalieData = [];

// Loop over data, populate arrays
// datum.default.forEach((item, i) => {
//   // Add goalie name, id to list array
//   goalieList.push({
//     id: i,
//     name: `${item.name} (${item.team})`
//   })

//   // Add all stat items to array
//   goalieData.push({
//     id: i,
//     ...item
//   })
// });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      stats: [
        {},
      ],
      time: `2019`,
      situation: `ALL`,
      goalies: [
        {
          id: undefined,
          name: ``,
          team: ``
        },
      ],
      goalieList: []
    };

    this.addGoalie = this.addGoalie.bind(this);
    this.pullGoalie = this.pullGoalie.bind(this);
    this.changeGoalie = this.changeGoalie.bind(this);

    this.addSituation = this.addSituation.bind(this);
    this.removeSituation = this.removeSituation.bind(this);

    this.addTime = this.addTime.bind(this);
    this.removeTime = this.removeTime.bind(this);

    this.resetFilters = this.resetFilters.bind(this);
  
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
        return {
          goalies: prevState.goalies.filter((goalie, i) => index !== i),
          stats: prevState.stats.filter((stat, i) => index !== i),
        }
      })
    };

    changeGoalie = (index, newGoalie) => {
      console.log(newGoalie);
      console.log(index);

      const id = `${newGoalie.id}_${newGoalie.team.toLowerCase()}`;

      database.ref(`2018_5v5/goalies/${id}`)
        .once('value')
        .then(snapshot => {
          const {percentile, stats, rank} = snapshot.val();
          this.setState(prevState => {
            return {
              goalies: prevState.goalies.map((goalie, i) => (
                (index === i) ? newGoalie : goalie
              )),
              stats: prevState.stats.map((stat, i) => (
                (index === i) ? {percentile, stats, rank} : stat
              ))
            }
          })
        }).catch(e => {
          console.log(`Error: ${e}`);
        });

    };

    // FUTURE: Function to retrieve stats

    addFilter = (stateName, val) => {
      this.setState(prevState => {
        return {
          stateName: prevState.stateName.concat(val)
        }
      })
    };

    removeFilter = (stateName, val) => {
      this.setState(prevState => {
        return {
          stateName: prevState.stateName.filter(filter => filter !== val)
        }
      });
    };

    addSituation = val => this.addFilter(this.state.situation, val);

    removeSituation = val => this.removeFilter(this.state.situation, val);

    addTime = val => this.addFilter("time", val);

    removeTime = val => this.removeFilter("time", val);

    // Reset filters function
    resetFilters = () => {
      this.setState({
        time: `2019`,
        situation: `ALL`
      })
    };


    componentDidMount() {
      let stateGoalieList = [];

      database.ref(`2018_5v5/list`)
        .once('value')
        .then(snapshot => {
          snapshot.forEach(item => {
            stateGoalieList.push(item.val());
          })
          this.setState({
            goalieList: stateGoalieList
          });
        }).catch(e => {
          console.log(`Error: ${e}`);
        });
    }
    // FUTURE: componentDidUpdate(prevProps, prevState) {}
    // FUTURE: componentWillUnmount() {}

  render() {
    return(
      <div className="App">
        <Header />
        <Display 
          stats={this.state.stats}
          goalies={this.state.goalies}
          goalieList={this.state.goalieList}
          time={this.state.time}
          situation={this.state.situation}
          changeGoalie={this.changeGoalie}
          addGoalie={this.addGoalie}
          pullGoalie={this.pullGoalie}
        />
      </div>
    )
  }

};

export default App