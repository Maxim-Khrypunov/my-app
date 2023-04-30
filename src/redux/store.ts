import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./authSlice";
import { codeReduser } from "./codeSlice";
import { productsReducer } from "./productsSlice";
import { shoppingReducer } from "./ShoppingSlice";


export const store =configureStore({
reducer:{
    auth:authSliceReducer,
    codeState:codeReduser,
    productsState:productsReducer,
    shoppingState:shoppingReducer,
}})