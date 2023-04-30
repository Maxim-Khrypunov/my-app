import { TypeOFRouteForNavigator } from "../model/TypeOFRouteForNavigator"


export const routeElements: TypeOFRouteForNavigator[]=[
    {path: '/', element: 'Home', always:true},
    {path: '/customers', element: 'Customers',  admin:true},
    {path: '/shoppingcart', element: 'Shopping Cart', client: true},
    {path: '/orders', element: 'Orders', authenticated:true},
    {path: '/products', element: 'Products', always:true},
    {path: '/login', element: 'Login', no_authenticated:true},
    {path: '/logout', element: 'Logout', authenticated:true},

]