import React from 'react';
import NavBar from '../../components/Navbar';
import Nav from 'react-bootstrap/Nav';
import './customMenu.css'

const Menu = () => {
  return (
    <div>
      <container fluid>
        <div className="navbar-container">
          <div className="navbar justify-content-end">
            <NavBar />
          </div>
          <div className="text-center my-4 mb-0 mt-0">
            <h1>Our Menu</h1>
          </div>

          <div className="text-center mb-2 mt-0">
            <h5>Fresh and healthy food choices</h5>
            <Nav className="justify-content-center" variant="" defaultActiveKey="/food">
              <Nav.Item>
                <Nav.Link href="/food">FOOD</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">DRINKS</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div>
            <Nav className="justify-content-right" variant="" defaultActiveKey="#">
              <Nav.Item>
                <Nav.Link href="#">Burgers</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">Pizza</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">Salad</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#">Kids</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </container>
    </div>
  );
};

export default Menu;
