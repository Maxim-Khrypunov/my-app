import { AppBar, Box, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { TypeOFRouteForNavigator } from "../../model/TypeOFRouteForNavigator";
import './navigators.css'
export type Props = {
    subnav?: boolean,
    routes: TypeOFRouteForNavigator[]
}
export const NavigatorDesktop: React.FC<Props> = ({subnav, routes}) => {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    useEffect(() => {
         if (!subnav){
            navigate(routes[0].path)
            setValue(0)
        }
         }, [routes])
    const handleChange = (event:any, newValue: number) => {
      setValue(newValue);
    };
  function getTabs(): ReactNode {
    return routes.map((route, index) => <Tab key={index} component={Link}
     to={route.path} label={route.element}/>)
  }
 return <Box sx={{
  
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop:"10vh",
  marginBottom: "0"
  
}}>
    <AppBar sx={{backgroundColor: "lightgray"}}>
        <Tabs value={value>routes.length? 0 :value} onChange={handleChange}>
            {getTabs()}
        </Tabs>
    </AppBar>
    <Outlet></Outlet>
 </Box>
}