import { configureStore } from "@reduxjs/toolkit";

import { authSliceReducer } from "./authSlice";
import { codeReduser } from "./codeSlice";


export const store =configureStore({
reducer:{
    auth:authSliceReducer,
    codeState:codeReduser
}})