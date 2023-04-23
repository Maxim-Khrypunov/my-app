import { Box, Button, Typography } from "@mui/material"

export const CardActions: React.FC=()=>
{
    return <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button variant="outlined">-</Button>
      <Typography sx={{ mx: 2 }}>0</Typography>
      <Button variant="outlined">+</Button>
    </Box>
    <Box sx={{ m: 1 }}>
      <Button variant="outlined" sx={{ width: '100%' }}>Add To Basket</Button>
    </Box>
  </Box>
}