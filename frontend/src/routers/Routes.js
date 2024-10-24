import React from 'react';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/home';
import Menu from '../pages/menu';
import MenuCategoryDynamic from '../pages/MenuCategoryDynamic';
import NotFoundPage from '../pages/NotFoundPage';
import MenuDetails, { menuLoader } from '../components/MenuDetails';

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
        {/* <Route path=":subcategory/:id" element={<MenuCategoryDynamic />}/> */}
        <Route path=":subcategory/:id" element={<MenuDetails />} loader={menuLoader}/>
        {/* <Route path="/:id" element={<MenuDetails />}/> */}
      </Route>
    </>
  )
)

export default AppRoutes;
