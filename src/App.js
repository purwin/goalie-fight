import React, { Component } from 'react'

import Header from './components/Header'
import Display from './components/Display'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          name: `Andy Moog`,
          gsaa: 18.5,
          sv: 92.1,
          xsv: 91.8,
          hdsv: 88.78,
          hdgsaa: -4.33,
          w: 22
        },
        {
          id: 3,
          name: `Dominic Roussel`,
          gsaa: -3,
          sv: 91.4,
          xsv: 92.5,
          hdsv: 77.9,
          hdgsaa: -1.87,
          w: 16
        },
        {
          id: 4,
          name: `Bob Essensa`,
          gsaa: -12,
          sv: 88.9,
          xsv: 95,
          hdsv: 77.9,
          hdgsaa: -9,
          w: 9
        },
        {
          id: 2,
          name: `Tommy Soderstrom`,
          gsaa: 16,
          sv: 93.09,
          xsv: 89.4,
          hdsv: 89.7,
          hdgsaa: 9,
          w: 37
        },
        {
          id: 5,
          name: `Don Beaupre`,
          gsaa: -0.3,
          sv: 90.03,
          xsv: 85.2,
          hdsv: 80.1,
          hdgsaa: .4,
          w: 22
        },
      ],
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

      console.log(this.state.goalies);
    };

    // Remove goalie from this.state.goalies
    pullGoalie = index => {
      console.log(index);
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.filter((goalie, i) => index !== i)
        }
      })

      console.log(this.state.goalies);
    };

    changeGoalie = (index, newGoalie) => {
      const fun = this.state.data.filter(item => newGoalie.id === item.id);
      console.log(fun)
      this.setState(prevState => {
        return {
          goalies: prevState.goalies.map((goalie, i) => (
            (index === i) ? newGoalie : goalie
          )),
          stats: prevState.stats.map((stat, i) => (
            (index === i) ? prevState.data.filter(item => newGoalie.id === item.id)[0] : stat
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
          changeGoalie={this.changeGoalie}
          addGoalie={this.addGoalie}
          pullGoalie={this.pullGoalie}
        />
      </div>
    )
  }

};

export default App