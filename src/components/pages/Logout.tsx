import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSliceAction } from "../../redux/authSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config";


export const Logout: React.FC = () =>
{
    const dispatch = useDispatch()
    async function logoutFn()
    {
        await authService.logout();
        localStorage.setItem(AUTH_USER_ITEM, "")
        dispatch(authSliceAction.logout())
    }
    const newAuth = useSelector<any,string>(state=>state.auth.userAuth)
    return <Box>
    <Button onClick={logoutFn}> Confirm exit from {newAuth} </Button>
    </Box>
}