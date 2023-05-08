import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/pages/Home';
import { Customers } from './components/pages/Customers';
import { Orders } from './components/pages/Orders';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { NotFound } from './components/pages/NotFound';
import { routeElements } from './config/Layout-config';
import { NavigatorDesktop } from './components/navigation/NavigatorDesktopNew';
import { useDispatch, useSelector } from 'react-redux';
import { TypeOFRouteForNavigator } from './model/TypeOFRouteForNavigator';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';
import { productsService } from './config/products-service-config';
import { productsActions } from './redux/productsSlice';
import { ProductType } from './model/Product Type';
import { Products } from './components/pages/Products';
import { ordersService } from './config/order-service-config';
import { shoppingActions } from './redux/ShoppingSlice';
import { Subscription } from 'rxjs';
import { CategoryType } from './model/Category Type';
import { categoryActions } from './redux/categorySlice';


function App() {
   const newUserAuth = useSelector<any,string>(state =>state.auth.userAuth)
   const [newRoutes, setRoutes] = useState(getRoutes());
   const dispatch = useDispatch()

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
      (route.client && !!newUserAuth && !newUserAuth.includes("admin")) ||
      (route.no_authenticated && !newUserAuth)
   }
   useEffect(()=>
   {
      setRoutes(getRoutes())
   },[newUserAuth]
   )
   useEffect(()=>{
      const subscription =productsService.getProducts()
      .subscribe({
         next:(products: ProductType[])=>{ 
            console.log(products)
            dispatch(productsActions.setProducts(products))}
      })
      return () =>subscription.unsubscribe()
   },[])

   useEffect(()=>{
      const subscription =productsService.getCategories()
      .subscribe({
         next:(category: CategoryType[])=>{ 
            console.log(category)
            dispatch(categoryActions.setCategoty(category))}
      })
      return () =>subscription.unsubscribe()
   },[])


   useEffect(() => {
      let subscription: Subscription;
      if (newUserAuth != '' && !newUserAuth.includes("admin")) {
           subscription = ordersService.getShoppingCart(newUserAuth).subscribe ({
                next: (shopping) => dispatch(shoppingActions.setShopping(shopping))
           })
      } else {
           dispatch(shoppingActions.resetShopping());
      }
      return () => {
           if (subscription) {
                subscription.unsubscribe();
           }
      }
 }, [newUserAuth])

   return <BrowserRouter>
      <Routes>
         <Route path="/" element={<NavigatorDesktop routes={newRoutes}/>}>
            <Route index element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
            <Route path="products" element={<Products/>}/>  
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout/>} />
            <Route path="/*" element={<NotFound/>} />
            <Route path="/*" element={<NotFound/>} />
          </Route>
      </Routes>
   </BrowserRouter>
}
export default App;


