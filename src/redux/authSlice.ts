import { createSlice } from "@reduxjs/toolkit";

const initialState: {userAuth:string}=
{
    userAuth:""
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
        state.userAuth = initialState.userAuth
    }
    }
 })
  export const authSliceAction = authSlice.actions
  export const authSliceReducer = authSlice.reducer