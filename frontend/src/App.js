import React, { Component } from 'react';
import './App.css';
import AppRoutes from './routers/Routes';
import { RouterProvider } from 'react-router-dom';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <div className="App">
        <RouterProvider router={AppRoutes}/>
      </div>
    );
  }
}

export default App;
