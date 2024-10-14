import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../pictures/logo.png';
import NavBar from '../components/Navbar'

const Home = () => (
  <div>
    <NavBar/>
    <header className="App-header">
      <div className='logo-background'>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          We Serve the Best Food!
        </p>
      </div>
      <p className='app-message'>Milmag Resturant web-App under construction!</p>
      <p>
        <Link to="/food" className="menu-link">Menu</Link>
        <br/>
        {/* Test Link for Not Found route */}
        <Link to="/menu" className="menu-link">MenuLink</Link>
      </p>
    </header>
  </div>
);

export default Home;
