import {configureStore} from "@reduxjs/toolkit"
import { authActions, authReduser } from "./authSlice"
export const store = configureStore({
    reducer:{
        auth: authReduser
    }
})