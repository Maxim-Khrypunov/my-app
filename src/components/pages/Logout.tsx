import React from "react";
import {useDispatch} from "react-redux"
import { authActions } from "../../redux/authSlice";
import { Box, Button } from "@mui/material";

export const Logout: React.FC = () =>
{
    const dispatch = useDispatch()
    return <Box><Button onClick={()=> dispatch(authActions.logout())}>Confirm Logout</Button></Box>
}