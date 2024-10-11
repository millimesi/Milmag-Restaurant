import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import '../stylesheets/customMenu.css';
import { Outlet, useNavigate } from 'react-router-dom'; // Link,

const Menu = () => {
  const [activeTab, setActiveTab] = useState('food'); // Track active tab (food/drinks)
  const [activeCategory, setActiveCategory] = useState('burgers'); // Track active category
  const navigate = useNavigate();

  const handleFoodClick = () => {
    setActiveTab('food');
    setActiveCategory('burgers'); // Set default active category for food
    navigate('/food/burgers');
  };

  const handleDrinksClick = () => {
    setActiveTab('drinks');
    setActiveCategory('soda'); // Set default active category for drinks
    navigate('/drinks/soda');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (activeTab === 'food') {
      navigate(`/food/${category}`);
    } else {
      navigate(`/drinks/${category}`);
    }
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
            <Nav className="justify-content-center" variant="">
              <Nav.Item>
                <Nav.Link 
                  className={`navbarlink ${activeTab === 'food' ? 'active' : ''}`} 
                  onClick={handleFoodClick}
                >
                  FOOD
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  className={`navbarlink ${activeTab === 'drinks' ? 'active' : ''}`} 
                  onClick={handleDrinksClick}
                >
                  DRINKS
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="menu-section">
            {/* Conditional Rendering Based on FOOD or DRINKS */}
            {activeTab === 'food' ? (
              <div className="food-section">
                <Nav className="justify-content-right">
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'burgers' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('burgers')}
                    >
                      Burgers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'pizza' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('pizza')}
                    >
                      Pizza
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'salads' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('salads')}
                    >
                      Salad
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'kids' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('kids')}
                    >
                      Kids
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            ) : (
              <div className="drink-section">
                <Nav className="justify-content-left">
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'soda' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('soda')}
                    >
                      Soft Drinks & Sodas
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'juice' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('juice')}
                    >
                      Juices & Smoothies
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'coffee' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('coffee')}
                    >
                      Tea & Coffee
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      className={`navbarlink ${activeCategory === 'milkshakes' ? 'active' : ''}`} 
                      onClick={() => handleCategoryClick('milkshakes')}
                    >
                      Milkshakes & Iced Beverages
                    </Nav.Link>
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
