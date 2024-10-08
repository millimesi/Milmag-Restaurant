import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import '../pages/stylesheets/customMenu.css';

const NavBar = () => {
  return (
    <div>
      <Nav variant="pills" className="justify-content-end navbar">
        <Nav.Item>
          {/* <Nav.Link className="navbarlink" href="/">HOME</Nav.Link> */}
          <Nav.Link className="navbarlink" as={Link} to="/">HOME</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link className="navbarlink" href="/food">MENU</Nav.Link> */}
          <Nav.Link className="navbarlink" as={Link} to="/food">MENU</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbarlink" href="#">RESERVATIONS</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavBar;
