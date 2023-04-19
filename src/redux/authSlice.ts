import { createSlice } from "@reduxjs/toolkit";
import { AUTH_USER_ITEM } from "../config/auth-service-config";

const initialState: {userAuth:string}=
{
    userAuth: localStorage.getItem(AUTH_USER_ITEM) || ""
}
 const authSlice = createSlice({
    initialState:initialState,
    name:"auth",
    reducers:{
    login:(state,data)=>
    {
        state.userAuth = data.payload
    },
    logout:(state)=>
    {
        state.userAuth = ""
    }
    }
 })
  export const authSliceAction = authSlice.actions
  export const authSliceReducer = authSlice.reducer