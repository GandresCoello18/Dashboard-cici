/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface Props {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}

export const DialogoForm = ({ Open, setOpen, title, children }: Props) => {
  return (
    <Dialog
      open={Open}
      fullWidth
      onClose={() => setOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{children}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
