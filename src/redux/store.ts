import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./authSlice";
import { codeReduser } from "./codeSlice";
import { productsReducer } from "./productsSlice";
import { shoppingReducer } from "./ShoppingSlice";
import { categoryReducer } from "./categorySlice";
import { ordersReducer } from "./ordersSlice";


export const store =configureStore({
reducer:{
    auth:authSliceReducer,
    codeState:codeReduser,
    productsState:productsReducer,
    shoppingState:shoppingReducer,
    categoryState:categoryReducer,
    ordersState:ordersReducer,
}})