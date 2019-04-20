import React, { Component } from 'react'

import Header from './components/Header'
import Display from './components/Display'
import './App.css'
import * as datum from './data/stats_2018_5v5.json'


// Define list of goalies
let goalieList = [];

// Define all goalie stats
let goalieData = [];

// Loop over data, populate arrays
datum.default.forEach((item, i) => {
  // Add goalie name, id to list array
  goalieList.push({
    id: i,
    name: `${item.name} (${item.team})`
  })

  // Add all stat items to array
  goalieData.push({
    id: i,
    ...item
  })
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: goalieData,
      stats: [
        {},
      ],
      time: `2019`,
      situation: `ALL`,
      goalies: [
        {
          id: undefined,
          name: ``
        },
      ],
      goalieList: goalieList.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
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
      console.log(index);
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.filter((goalie, i) => index !== i),
          stats: prevState.stats.filter((stat, i) => index !== i),
        }
      })
    };

    changeGoalie = (index, newGoalie) => {
      console.log(newGoalie);
      const fun = this.state.data.filter(item => newGoalie.value === item.id);
      console.log(fun)
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.map((goalie, i) => (
            (index === i) ? newGoalie : goalie
          )),
          stats: prevState.stats.map((stat, i) => (
            (index === i) ? prevState.data.filter(item => newGoalie.value === item.id)[0] : stat
          ))
        }
      })

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


    // FUTURE: componentDidMount() {}
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