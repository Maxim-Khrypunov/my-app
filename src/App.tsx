import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/pages/Home';
import { Customers } from './components/pages/Customers';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { Dairy } from './components/pages/Dairy';
import { Bread } from './components/pages/Bread';
import { NotFound } from './components/pages/NotFound';
import { Navigator } from './components/navigation/Navigator';
import { routeElements } from './config/Layout-config';
import { routesElementsForProduct } from './config/product-config';
import { NavigatorDesktop } from './components/navigation/NavigatorDesktop';
import { useSelector } from 'react-redux';
import { TypeOFRouteForNavigator } from './model/TypeOFRouteForNavigator';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';


function App() {
   const newUserAuth = useSelector<any,string>(state =>state.auth.userAuth)
   const [newRoutes, setRoutes] = useState(getRoutes());
   
   function getRoutes():TypeOFRouteForNavigator[]
   {
      const routesRes =routeElements.filter(routePredicate)
      const logoutRoute = routesRes.find(route=>route.path==="/logout")
      if (logoutRoute) {logoutRoute.element = newUserAuth}
      return routesRes;
   }
   function routePredicate(route:TypeOFRouteForNavigator): boolean|undefined
   {
      return route.always || (route.authenticated && !!newUserAuth) ||
      (route.admin && newUserAuth.includes("admin")) || 
      (route.no_authenticated && !newUserAuth)
   }
   useEffect(()=>
   {
      setRoutes(getRoutes())
   },[newUserAuth]
   )
   return <BrowserRouter>
      <Routes>

         <Route path="/" element={<NavigatorDesktop routes={newRoutes}/>}>
            <Route index element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
            <Route path="products" element={<Navigator subnavigator routes={routesElementsForProduct} />}>
               <Route path="dairy" element={<Dairy />} />
               <Route path="bread" element={<Bread />} />
               
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout/>} />
            <Route path="/*" element={<NotFound/>} />
            </Route>
            
            <Route path="/*" element={<NotFound/>} />

      </Routes>
   </BrowserRouter>
}

export default App;