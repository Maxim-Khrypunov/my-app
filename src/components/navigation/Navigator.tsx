import { useMediaQuery } from "@mui/material";
import { NavigatorDesktop } from "./NavigatorDesktopNew";
import { TypeOFRouteForNavigator } from "../../model/TypeOFRouteForNavigator";
import { NavigatorPortrait } from "./NavigatorPortrait";

type Props = {
    subnav?: boolean,
    routes: TypeOFRouteForNavigator[]
}
export const Navigator: React.FC<Props> = (props) => {
    const navigatorDesktop =  useMediaQuery('(min-width:600px)');
    return navigatorDesktop ? <NavigatorDesktop routes={props.routes}/>: <NavigatorPortrait routes={props.routes}/>;
}