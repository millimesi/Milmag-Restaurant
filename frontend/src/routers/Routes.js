import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu';
import MenuCategoryDynamic from '../pages/MenuCategoryDynamic';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<Menu />}>
        <Route index element={<Navigate to="/food/burgers" replace />} />
        <Route path=":category" element={<MenuCategoryDynamic />} />
      </Route>
      <Route path="/drinks" element={<Menu />}>
        <Route index element={<Navigate to="/drinks/soda" replace />} />
        <Route path=":category" element={<MenuCategoryDynamic />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
