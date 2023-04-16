import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSliceAction } from "../../redux/authSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


export const Logout: React.FC = () =>
{
    const dispatch = useDispatch()
    const newAuth = useSelector<any,string>(state=>state.auth.userAuth)
    return <Box>
    <Button onClick={()=>dispatch(authSliceAction.logout())}> Confirm exit from {newAuth} </Button>
    </Box>
}