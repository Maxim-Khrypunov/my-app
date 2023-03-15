import React from "react";
import { useDispatch } from "react-redux";
import { Input } from "./input";
import { authUserActions } from "../redux/authSlice";

export const Login: React.FC = () =>
{
    const dispatch = useDispatch();
    function submit(value: string):any
    { 
      let res =  dispatch(authUserActions.login(value))
      return res;
    }
    
    return <div>
    <h3>Login</h3>
    <Input submitFn={submit} placeHolder={"Enter login or admin"} buttonName = "OK" /> 
    </div>
}

