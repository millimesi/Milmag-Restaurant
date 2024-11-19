import React from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu';
import MenuCategoryDynamic from '../pages/MenuCategoryDynamic';
import NotFoundPage from '../components/NotFoundPage.js';
import MenuDetails, { menuLoader } from '../pages/MenuDetails';
import Cart from '../pages/cart.jsx';
import Register from '../pages/register.jsx';
import Login from '../pages/login.jsx';
import ForgotPassword from '../pages/forgotPassword.jsx';
import PasswordReset from '../pages/passwordReset.jsx';

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='*' element={<NotFoundPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/food" element={<Menu />} >
        <Route index element={<Navigate to="/food/burger" replace />} />
        <Route path=":subcategory" element={<MenuCategoryDynamic />} />
        <Route path=":subcategory/:id" element={<MenuDetails />} loader={menuLoader}/>
      </Route>
      <Route path="/drinks" element={<Menu />} >
        <Route index element={<Navigate to="/drinks/softdrinks" replace />} />
        <Route path=":subcategory" element={<MenuCategoryDynamic />} />
        <Route path=":subcategory/:id" element={<MenuDetails />} loader={menuLoader}/>
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword/>} />
      <Route path="/passwordReset" element={<PasswordReset />} />
    </>
  )
)

export default AppRoutes;
