import { LoginData } from "../model/LoginData";
import AuthService from "./AuthService";
import {FirebaseApp } from "../config/firebase-config";
import {getAuth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth"
export default class AuthServiceFirebase implements AuthService 
{
    auth = getAuth(FirebaseApp)
    async login(loginData: LoginData): Promise<string> {
        if (loginData.email=="GOOGLE") {return this.signInGoogle()}
        if (loginData.email=="GITHUB") {return this.signInGitHub()}
        return this.signPassword(loginData)
    }
    async logout(): Promise<void> {
       await signOut(this.auth);
    }
    private async signInGoogle(): Promise<string>
    {
        const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
        return credential.user.email as string;
    }

    private async signInGitHub(): Promise<string>
    {
        const credential = await signInWithPopup(this.auth, new GithubAuthProvider());
        return credential.user.email as string;
    }
   
    private async signPassword(loginData:LoginData): Promise<string> {
        await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
        return loginData.email;
    }
}