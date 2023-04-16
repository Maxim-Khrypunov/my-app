import AuthService from "../service/AuthService";
import AuthServiceFirebase from "../service/AuthServiceFirebase";

export const authService: AuthService = new AuthServiceFirebase()
export const AUTH_USER_ITEM = "auth-user";