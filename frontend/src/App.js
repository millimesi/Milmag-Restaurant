import React, { Component } from 'react';
import './App.css';
import AppRoutes from './routers/Routes';
import { RouterProvider } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <div className="App">
        {/* ToastContainer for global notifications */}
        {/* <ToastContainer position="top-right" autoClose={3000} closeOnClick={true} pauseOnHover={true} draggable={true} /> */}

        <RouterProvider router={AppRoutes}/>
      </div>
    );
  }
}

export default App;
