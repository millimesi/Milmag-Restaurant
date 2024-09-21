import logo from './logo.png';
import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {  } 
  render() { 
    return (
      <div className="App">
      <header className="App-header">
        <div className='logo-background'>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            We Serve the Best Food!
          </p>
        </div>
        <p className='app-message'>Milmag Resturant web-App under construction!</p>
      </header>
    </div>
    );
  }
}
 
export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
