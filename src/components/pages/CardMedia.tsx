import { Avatar } from "@mui/material"

type Props =
{
    image:string,
}
export const CardMedia: React.FC<Props> = ({image}) =>
{    
   return <Avatar src={image} sx={{ width: "85%", height: "35vh", alignSelf: "center" }}/> 
}