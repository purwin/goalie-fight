import React, { Component } from 'react'

import Header from './components/Header'
import Display from './components/Display'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [
        {
          id: 1,
          name: `Andy Moog`,
          gsaa: 18.5,
          sv: 92.1,
          xsv: 91.8,
          hdsv: 88.78,
          w: 22
        },
      ],
      time: `2019`,
      situation: `ALL`,
      goalies: [
        {
          id: null,
          name: ``
        },
      ],
      goalieList: [
        {
          id: 1,
          name: `Andy Moog`
        },
        {
          id: 3,
          name: `Dominic Roussel`
        },
        {
          id: 4,
          name: `Bob Essensa`
        },
        {
          id: 2,
          name: `Tommy Soderstrom`
        },
        {
          id: 5,
          name: `Don Beaupre`
        }
      ],
    };

    this.addGoalie = this.addGoalie.bind(this);
    this.removeGoalie = this.removeGoalie.bind(this);
    this.addSituation = this.addSituation.bind(this);
    this.removeSituation = this.removeSituation.bind(this);
    this.addTime = this.addTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  
  }

    // Add goalie to this.state.goalies
    addGoalie = add => {
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.concat(add)
        }
      })
    };

    // Remove goalie from this.state.goalies
    removeGoalie = remove => {
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.filter(goalie => goalie.id !== remove.id)
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

    removeTime = val => this.emoveFilter("time", val);

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
        />
      </div>
    )
  }

};

export default App