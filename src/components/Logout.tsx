import React from "react";
import { useDispatch } from "react-redux";
import { authUserActions } from "../redux/authSlice";

export const Logout: React.FC = () =>
{
    const dispatch = useDispatch();
    return <div> <button onClick={()=>dispatch(authUserActions.logout())}>Logout</button></div>
}