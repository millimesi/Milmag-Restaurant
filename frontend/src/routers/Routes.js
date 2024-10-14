import React from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu';
import MenuCategoryDynamic from '../pages/MenuCategoryDynamic';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='*' element={<NotFoundPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<Menu />}>
        <Route index element={<Navigate to="/food/burgers" replace />} />
        <Route path=":category" element={<MenuCategoryDynamic />} />
          <Route path=":category/:id" element={<MenuCategoryDynamic />}/>
      </Route>
      <Route path="/drinks" element={<Menu />}>
        <Route index element={<Navigate to="/drinks/soda" replace />} />
        <Route path=":category" element={<MenuCategoryDynamic />} />
        <Route path=":category/:id" element={<MenuCategoryDynamic />}/>
      </Route>
    </>
  )
)

export default AppRoutes;
