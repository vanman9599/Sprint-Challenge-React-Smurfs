import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [], 
     
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({ smurfs: response.data }))
      .catch(error => console.log(error));
        
  }
  addSmurf = (event, smurf) => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios
    .post('http://localhost:3333/smurfs', smurf)
    .then(res => {
      this.setState({
        smurfs: res.data
      });
      // HTTP STEP V - Clear data form in ItemForm and route to /item-list
      // this.props.history.push('/item-list');
    })
    .catch(err => {
      console.log(err);
    });

  }
  

  render() {
    return (
      <div className="App">
        <Route path="/smurf-form" render={props => (
          <SmurfForm {...props} addSmurf={this.addSmurf} />
        )} />
        
        <Route path="/smurf-form" render={props => (
          <Smurfs {...props} smurfs={this.state.smurfs} />
        )} />
        
      </div>
    );
  }
}

export default App;
