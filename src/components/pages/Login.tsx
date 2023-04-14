import React from "react";
import { LoginForm } from "../forms/loginForm";
import {useDispatch} from "react-redux"
import { authActions } from "../../redux/authSlice";

export const Login: React.FC = () =>
{
    const dispatch = useDispatch()

    return <LoginForm submitFn={(loginData)=> dispatch(authActions.login(loginData.email))}></LoginForm>
}