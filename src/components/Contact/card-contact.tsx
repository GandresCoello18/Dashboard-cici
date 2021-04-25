/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import { DialogoForm } from '../../components/DialogoForm';
import { Contact } from '../../interfaces/Contacto';
import { useState } from 'react';
import { DialogoMessage } from '../DialogoMessage';

interface Props {
  Contact: Contact;
}

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginBottom: 10,
  },
  BtnDelete: {
    color: 'red',
  },
});

export const CardContact = ({ Contact }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const classes = useStyles();

  console.log(AceptDialog);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {Contact.subject}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {Contact.message}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Estado: <strong>{Contact.status}</strong>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' className={classes.BtnDelete} onClick={() => setVisibleDialog(true)}>
            Eliminar
          </Button>
          <Button size='small' color='secondary' onClick={() => setVisible(true)}>
            Responder
          </Button>
        </CardActions>
      </Card>

      <DialogoForm Open={visible} setOpen={setVisible} title='Responder mensaje'>
        fwefwf
      </DialogoForm>

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
      />
    </>
  );
};
