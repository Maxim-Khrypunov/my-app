import AuthService from "../service/AuthService";
import AuthServiceFirebase from "../service/AuthServiceFirebase";

export const authService: AuthService = new AuthServiceFirebase()
