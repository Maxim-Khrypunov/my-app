import { AppBar, Box, Drawer, IconButton, List, Menu, SwipeableDrawer, Tab, Tabs, Toolbar, Typography} from "@mui/material"
import { TypeOFRouteForNavigator } from "../../model/TypeOFRouteForNavigator"
import React, { ReactNode, useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import CabinIcon from '@mui/icons-material/Cabin';

export type Props = {
    subnav?: boolean,
    routes: TypeOFRouteForNavigator[]
}

export const NavigatorPortrait: React.FC<Props> = ({ subnav, routes }) => {
    const [flOpen, setOpen] = useState<boolean>(false);
  
    function toggleOpen() {
      setOpen(!flOpen);
    }

    function getTabs(): ReactNode {
      return routes.map((route, index) => (
        <Tab key={index} component={Link} to={route.path} label={route.element} />
      ));
    }
  
    return (
      <Box sx={{ marginTop: { xs: "15vh", sm: "20vh" } }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton onClick={toggleOpen} sx={{ color: 'white' }}>
              <CabinIcon />
            </IconButton>
            <Typography sx={{ width: "100%", textAlign: "center", fontSize: "1.3em" }}>
              BEST BACKERY
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={flOpen}
          onClose={toggleOpen}
          onOpen={toggleOpen}
          anchor="left"
          PaperProps={{ sx: { width: '64vw' } }}
        >
         <List style={{ marginTop: "7vh", color: "black" }}>
        {getTabs()}
            </List>
        </SwipeableDrawer>
        <Outlet />
      </Box>
    );
  };


