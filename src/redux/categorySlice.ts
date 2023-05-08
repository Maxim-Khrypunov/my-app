import { createSlice } from "@reduxjs/toolkit";
import { CategoryType } from "../model/Category Type";

const initialState:{category: CategoryType[]} =
{
    category:[]
}
const categorySlice = createSlice(
    {
        initialState, name:"categoryState", 
        reducers:
        {
            setCategoty:(state, data) =>{state.category = data.payload}
        }
    }
)
export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;