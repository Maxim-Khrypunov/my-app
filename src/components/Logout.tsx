import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserActions } from "../redux/authSlice";

export const Logout: React.FC = () =>
{
    const dispatch = useDispatch();
    const authUser =useSelector<any,string>(state=>state.auth.authUser)
    return <div> <button onClick={()=>dispatch(authUserActions.logout())}>Logout {authUser}</button></div>
}