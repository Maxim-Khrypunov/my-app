import { createSlice } from "@reduxjs/toolkit"

const initialState:{authUser: string} =
{
    authUser:""
}
const authSlice = createSlice({
    initialState,
    name:"auth",
    reducers: {
        login:(state,data)=>
        {
            state.authUser= data.payload;
        },
        logout:(state)=>
        {
            state.authUser ="";
        }
    }
})
export const authActions = authSlice.actions;
export const authReduser = authSlice.reducer;
