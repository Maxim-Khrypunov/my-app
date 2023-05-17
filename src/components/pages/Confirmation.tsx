import React from 'react';
import {Button, Box, Dialog,DialogActions,
     DialogContent, DialogContentText, DialogTitle} from '@mui/material'

type Props = {
    title: string;
    content: string;
    confirmFn: (Ok: boolean) => void;
    open: boolean;
    buttons?:string[]
}

export  const Confirmation: React.FC<Props> = ({title, confirmFn, content, open, buttons}) => {
  const handleClose = (Ok: boolean) => {
    confirmFn(Ok);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() =>handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}> {buttons? buttons[0] : "Cancel"}</Button>
          <Button onClick={() => handleClose(true)} >{buttons? buttons[1]: "Accept"}</Button>
        </DialogActions>
      </Dialog>
      </Box>
    
  );
}