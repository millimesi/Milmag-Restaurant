import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import '../stylesheets/customMenu.css';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('food'); // Track active tab (food/drinks)
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab === 'food' ? 'food/burgers' : 'drinks/soda'}`); // Default active category
  };

  return (
    <div>
      <Container fluid>
        <div className="menubar-container">
          <NavBar />
          <div className="text-center mb-0 mt-0">
            <h1 className='mb-0 mt-0'>Menu Selections</h1>
          </div>

          <div className="text-center mb-0 mt-0">
            <h5 className='sub'>A Commitment to Freshness and Quality in Every Dish</h5>
            <div className="d-flex justify-content-center">
              <NavLink 
                className={`p-3 menubarlink ${activeTab === 'food' ? 'active' : ''}`} 
                to="/food/burger"
                onClick={() => handleTabClick('food')}
              >
                FOOD
              </NavLink>
              <NavLink 
                className={`p-3 menubarlink ${activeTab === 'drinks' ? 'active' : ''}`} 
                to="/drinks/softdrinks" 
                onClick={() => handleTabClick('drinks')}
              >
                DRINKS
              </NavLink>
            </div>
          </div>

          <div className="menu-section">
            {/* Conditional Rendering Based on FOOD or DRINKS */}
            {activeTab === 'food' ? (
              <div className="d-flex">
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'burger' ? 'active' : ''}`}
                  to="/food/burger"
                  onClick={() => setActiveTab('food')}
                >
                  BURGER
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'pizza' ? 'active' : ''}`} 
                  to="/food/pizza"
                  onClick={() => setActiveTab('food')}
                >
                  PIZZA
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'salad' ? 'active' : ''}`} 
                  to="/food/salad"
                  onClick={() => setActiveTab('food')}
                >
                  SALAD
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'kids' ? 'active' : ''}`} 
                  to="/food/kids"
                  onClick={() => setActiveTab('food')}
                >
                  KIDS
                </NavLink>
              </div>
            ) : (
              <div className="d-flex">
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'softdrinks' ? 'active' : ''}`} 
                  to="/drinks/softdrinks"
                  onClick={() => setActiveTab('drinks')}
                >
                  Soft Drinks & Sodas
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'juice' ? 'active' : ''}`} 
                  to="/drinks/juice"
                  onClick={() => setActiveTab('drinks')}
                >
                  Juices & Smoothies
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'coffee' ? 'active' : ''}`} 
                  to="/drinks/coffee"
                  onClick={() => setActiveTab('drinks')}
                >
                  Tea & Coffee
                </NavLink>
                <NavLink 
                  className={`p-3 menubarlink ${activeTab === 'milkshakes' ? 'active' : ''}`} 
                  to="/drinks/milkshakes"
                  onClick={() => setActiveTab('drinks')}
                >
                  Milkshakes & Iced Beverages
                </NavLink>
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
