import React from "react";
import { useDispatch } from "react-redux";
import { Input } from "./input";
import { authUserActions } from "../redux/authSlice";

export const Login: React.FC = () =>
{
    const dispatch = useDispatch();
    const submit = (value: string):any =>
    { 
      let res:string = value
      dispatch(authUserActions.login(res))
      return res;
    }

    return <div>

    <Input submitFn={submit} placeHolder={"Enter login or admin"} buttonName = "OK" /> 
    </div>
}

