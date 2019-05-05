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
      time: `2018`,
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

    this.setFilter = this.setFilter.bind(this);

    this.setSituation = this.setSituation.bind(this);

    this.getStatDB = this.getStatDB.bind(this);
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

      // database.ref(`2018/ALL/goalies/${id}`)
      //   .once('value')
      //   .then(snapshot => {
      //     const data = snapshot.val();
      //     this.setState(prevState => {
      //       return {
      //         goalies: prevState.goalies.map((goalie, i) => (
      //           (index === i) ? newGoalie : goalie
      //         )),
      //         stats: prevState.stats.map((stat, i) => (
      //           (index === i) ? data : stat
      //         ))
      //       }
      //     })
      //   }).catch(e => {
      //     console.log(`Error: ${e}`);
      //   });

    };

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
      

    }

    // FUTURE: Function to retrieve stats

    setFilter = (stateName, val) => {
      this.setState({
        [stateName]: val
      })
    };

    setSituation = val => {
      // Call setFilter with passed argument
      // this.setFilter(`situation`, val)
      this.setState({
        situation: val
      }, () => {
        this.state.goalies.forEach((goalie, i) => {
          this.changeGoalie(i, goalie);
          // console.log(goalie);
          console.log(this.state.situation);
          console.log(this.state.data);
        });
      })
    };


    componentDidMount() {
      let stateGoalieList = [];

      database.ref(`2018/options`)
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
          setSituation={this.setSituation}
          changeGoalie={this.changeGoalie}
          addGoalie={this.addGoalie}
          pullGoalie={this.pullGoalie}
        />
      </div>
    )
  }

};

export default App