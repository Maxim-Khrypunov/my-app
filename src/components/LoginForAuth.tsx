import React from "react"
import { useDispatch } from "react-redux"
import { Input } from "./Input"
import { authAction } from "../redux/authSlice"
export const LoginForAuth: React.FC = ()=>
{
    const dispatch = useDispatch()
    function signIn(value:string):string
    {
        dispatch(authAction.Login(value))
        return""
    }
    return <div>
     <Input submitFn={signIn} placeHolder={"Enter login"} buttonName="Sign In"></Input>
    </div>
}