/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { makeStyles, Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Dispatch, ReactNode, /*forwardRef,*/ SetStateAction } from 'react';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

interface Props {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export const DialogoScreenFull = ({ Open, setOpen, children }: Props) => {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={Open} onClose={() => setOpen(false)}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => setOpen(false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Salir
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};
