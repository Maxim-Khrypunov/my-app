import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/authSlice";

export const LogoutForAuth: React.FC = () =>
{
    const dispatch = useDispatch()
    const newAuth = useSelector<any,string>(state=>state.auth.userAuth)
    return <div>
        <button onClick={()=>dispatch(authAction.Logout())}> Exit from {newAuth} </button>
    </div>
}