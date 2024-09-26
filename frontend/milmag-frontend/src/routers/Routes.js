import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu/food';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default home route */}
      <Route path="/" element={<Home />} />

      {/* Route for the Menu page */}
      <Route path="/food" element={<Menu />} />
    </Routes>
  );
};

export default AppRoutes;
