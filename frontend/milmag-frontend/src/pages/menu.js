import React, { useState } from 'react';
import NavBar from '../components/navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './stylesheets/customMenu.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Menu = () => {
  const [isFood, setIsFood] = useState(true);
  const navigate = useNavigate();

  const handleFoodClick = () => {
    setIsFood(true);
    navigate('/food/burgers');
  };

  const handleDrinksClick = () => {
    setIsFood(false);
    navigate('/drinks/soda');
  };

  return (
    <div>
      <Container fluid>
        <div className="navbar-container">
          <div className="navbar justify-content-end">
            <NavBar />
          </div>
          <div className="text-center mb-0 mt-0">
            <h1 className='mb-0 mt-0'>Our Menu</h1>
          </div>

          <div className="text-center mb-0 mt-0">
            <h5 className='mb-0 mt-0'>Fresh and healthy food choices</h5>
            <Nav className="justify-content-center" variant="" defaultActiveKey="/food/burgers">
              <Nav.Item>
                {/* <Nav.Link as={Link} to="/food/burgers">FOOD</Nav.Link> */}
                <Nav.Link className="navbarlink" onClick={handleFoodClick}>FOOD</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link as={Link} to="/food/burgers">DRINKS</Nav.Link> */}
                <Nav.Link className="navbarlink" onClick={handleDrinksClick}>DRINKS</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="menu-section">
            {/* Conditional Rendering Based on FOOD or DRINKS */}
            {isFood ? (
              <div className="food-section">
                <Nav className="justify-content-right">
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/food/burgers">Burgers</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/food/pizza">Pizza</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/food/salad">Salad</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/food/kids">Kids</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            ) : (
              <div className="drink-section">
                <Nav className="justify-content-left">
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/drinks/soda">Soft Drinks & Sodas</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/drinks/juice">Juices & Smoothies</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/drinks/coffee">Tea & Coffee</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="navbarlink" as={Link} to="/drinks/milkshake">Milkshakes & Iced Beverages</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            )}
          </div>
        </div>
        {/* Outlet renders the selected food or drink */}
        <div className="list-section">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default Menu;
