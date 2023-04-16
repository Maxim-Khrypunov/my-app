import React from "react"
import { useDispatch } from "react-redux"
import { authSliceAction } from "../../redux/authSlice"
import { LoginForm } from "../forms/loginForm"

export const Login: React.FC = ()=>
{
    const dispatch = useDispatch()
    function signIn(value: any)
    {
        dispatch(authSliceAction.login(value.email))
        return""
    }
    return <div>
        <LoginForm submitFn={signIn}></LoginForm>
    </div>
}