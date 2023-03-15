import {configureStore} from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import { authUserReducer } from "./authSlice";
export const store:any = configureStore({
    reducer:{
        count:counterReducer,
        auth:authUserReducer  
    }
})
