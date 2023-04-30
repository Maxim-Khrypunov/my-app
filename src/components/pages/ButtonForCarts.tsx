import { Box, Button, Typography } from "@mui/material"

export const ButtonForCarts: React.FC=()=>
{
    return <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button variant="outlined">Delete all</Button>
      <Button variant="outlined">Make payment</Button>
    </Box>
  </Box>
}