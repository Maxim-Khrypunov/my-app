import { createSlice } from "@reduxjs/toolkit";
const initialState:{authUser:string} =
{
    authUser:""
}
const authUserSlice = createSlice({
initialState: initialState,
name: "auth",
reducers:
{
 login: (state, data) =>
 {
 state.authUser =  data.payload
 },
 logout:(state) => 
 {state.authUser = initialState.authUser}
}
});
export const authUserActions = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;