import { useSelector } from "react-redux"
import { Products } from "./Products";
import { Orders } from "./Orders";

export const Home: React.FC=()=>
{
    const newUserAuth = useSelector<any,string>(state =>state.auth.userAuth);

    return !newUserAuth|| !newUserAuth.includes("admin") ? <Products/> : <Orders/>
}