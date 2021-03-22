/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAceptDialog: Dispatch<SetStateAction<boolean>>;
  title: string;
  content: string;
}

export const DialogoMessage = ({ Open, setOpen, setAceptDialog, title, content }: Props) => {
  return (
    <Dialog
      open={Open}
      onClose={() => setOpen(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAceptDialog(true)} color='secondary' variant='contained'>
          Aceptar
        </Button>
        <Button onClick={() => setOpen(false)} color='primary' variant='contained' autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
