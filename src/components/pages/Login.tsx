import React from "react";
import { LoginForm } from "../forms/loginForm";
import {useDispatch} from "react-redux"
import { authActions } from "../../redux/authSlice";
import { LoginData } from "../../model/LoginData";
import { authService } from "../../config/auth-service-config";

export const Login: React.FC = () =>
{
    const dispatch = useDispatch()
    async function loginFn(loginData: LoginData)
    {
        const email = await authService.login(loginData);
        dispatch(authActions.login(email))
    }

    return <LoginForm submitFn={loginFn}></LoginForm>
}