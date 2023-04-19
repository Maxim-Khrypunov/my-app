import React from "react"
import { useDispatch } from "react-redux"
import { authSliceAction } from "../../redux/authSlice"
import { LoginForm } from "../forms/loginForm"
import { LoginData } from "../../model/LoginData"
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config"
import { codeAction } from "../../redux/codeSlice"

export const Login: React.FC = ()=>
{
    const dispatch = useDispatch();
    async function loginFn(loginData: LoginData)
    {
        try{
        const email:string =  await authService.login(loginData);
        localStorage.setItem(AUTH_USER_ITEM, email)
        dispatch(authSliceAction.login(email));
        dispatch(codeAction.set("OK"))}
        catch(error){
            dispatch(codeAction.set("wrong Credential"))
            }
    }
 
    return <div>
        <LoginForm submitFn={loginFn}></LoginForm>
    </div>
}