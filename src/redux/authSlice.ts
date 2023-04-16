import { createSlice } from "@reduxjs/toolkit";

const initialState: {userAuth:string}=
{
    userAuth:""
}
 const auth = createSlice({
    initialState:initialState,
    name:"auth",
    reducers:{
    Login:(state,data)=>
    {
        state.userAuth = data.payload
    },
    Logout:(state)=>
    {
        state.userAuth = initialState.userAuth
    }
    }
 })
  export const authAction = auth.actions
  export const authReducer = auth.reducer