import { configureStore } from "@reduxjs/toolkit";

import { authSliceReducer } from "./authSlice";
import { codeReduser } from "./codeSlice";
import { productsReducer } from "./productsSlice";


export const store =configureStore({
reducer:{
    auth:authSliceReducer,
    codeState:codeReduser,
    productsState:productsReducer
}})