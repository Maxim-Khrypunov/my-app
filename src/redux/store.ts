import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./conterSlice";
import { authReducer } from "./authSlice";

export const store =configureStore({
reducer:{
    count:counterReducer,
    auth: authReducer
}

})