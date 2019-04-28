import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import * as firebase from 'firebase'

import Header from './components/Header'
import Display from './components/Display'
import './firebase/firebase'
import './App.css'

library.add(faPlus) // + SVG icon
library.add(faTimes) // X SVG icon

const database = firebase.database();

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
      const id = `${newGoalie.id}_${newGoalie.team.toLowerCase()}`;

      database.ref(`2018_5v5/goalies/${id}`)
        .once('value')
        .then(snapshot => {
          const data = snapshot.val();
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