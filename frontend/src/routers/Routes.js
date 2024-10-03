import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu';
import Pizza from '../components/Pizza';
import Burger from '../components/Burger';
import Salad from '../components/salad';
import Kids from '../components/kids';
import Soda from '../components/soda';
import Juice from '../components/juice';
import Coffee from '../components/coffee';
import Milkshake from '../components/milkshake';

  const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/food" element={<Menu />}>
        <Route index element={<Navigate to="/food/burgers" replace />} />
        <Route path="burgers" element={<Burger />} />
        <Route path="pizza" element={<Pizza />} />
        <Route path="salad" element={<Salad />} />
        <Route path="kids" element={<Kids />} />
      </Route>

      <Route path="/drinks" element={<Menu />}>
        <Route index element={<Navigate to="/drinks/soda" replace />} />
        <Route path="soda" element={<Soda />} />
        <Route path="juice" element={<Juice />} />
        <Route path="coffee" element={<Coffee />} />
        <Route path="milkshake" element={<Milkshake />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
