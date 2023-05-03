
import { Box, Typography } from "@mui/material";
type Props =
{
    category:string,
    title:string,
    unit:string,
    cost:any
}

export const CardContent:  React.FC<Props> = ({category,title,unit,cost}) =>
{
    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <Typography variant="h4" sx={{ color: "brown", marginTop: "5px",  maxWidth: "100%" }}>{category}</Typography>
    <Typography variant="h6" sx={{ color: "blue", marginTop: "5px",  maxWidth: "100%" }}>{title}</Typography>
    <Typography variant="h5" sx={{ color: "red", marginTop: "5px" }}>{unit}</Typography>
    <Typography variant="h5" sx={{ color: "green", marginTop: "5px" }}>{cost} shekels </Typography>
    </Box>
}
