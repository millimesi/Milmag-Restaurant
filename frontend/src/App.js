import React, { Component } from 'react';
import './App.css';
import AppRoutes from './routers/Routes';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <div className="App">
        <AppRoutes/>
      </div>
    );
  }
}

export default App;
