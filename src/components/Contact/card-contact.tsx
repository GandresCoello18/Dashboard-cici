/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { DialogoForm } from '../../components/DialogoForm';
import { Contact } from '../../interfaces/Contacto';
import { useEffect, useState, useContext, SetStateAction, Dispatch } from 'react';
import { DialogoMessage } from '../DialogoMessage';
import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { DeleteContact } from '../../api/contact';
import { FormSendMessage } from './form-send-message';

interface Props {
  Contact: Contact;
  setReloadContact: Dispatch<SetStateAction<boolean>>;
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

export const CardContact = ({ Contact, setReloadContact }: Props) => {
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [idContact, setIdContact] = useState<string>('');
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    const FetchDelete = async () => {
      setLoading(true);

      try {
        await DeleteContact({ token, idContact });
        setLoading(false);

        setReloadContact(true);
        toast.success('Mensaje eliminado');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (AceptDialog) {
      FetchDelete();
      setVisibleDialog(true);
    }
  }, [AceptDialog, token, idContact, setReloadContact]);

  return (
    <>
      {Loading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h4' component='h2'>
                  Asunto: <strong>{Contact.subject}</strong>
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Mensaje: {Contact.message}
                </Typography>
                <br />
                <Typography variant='body2' color='textSecondary' component='p'>
                  <Alert severity={Contact.status === 'Pendiente' ? 'warning' : 'success'}>
                    Estado: <strong>{Contact.status}</strong>
                    <br />
                    Nombre: <strong>{Contact.name}</strong>
                    <br />
                    Correo: <strong>{Contact.email}</strong>
                  </Alert>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size='small'
                className={classes.BtnDelete}
                onClick={() => {
                  setVisibleDialog(true);
                  setIdContact(Contact.idContact);
                }}
              >
                Eliminar
              </Button>
              <Button size='small' color='secondary' onClick={() => setVisible(true)}>
                Responder
              </Button>
            </CardActions>
          </Card>

          <DialogoForm Open={visible} setOpen={setVisible} title='Responder mensaje'>
            <FormSendMessage Contacto={Contact} setReloadContact={setReloadContact} />
          </DialogoForm>

          <DialogoMessage
            title='Aviso importante'
            Open={VisibleDialog}
            setOpen={setVisibleDialog}
            setAceptDialog={setAceptDialog}
            content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
          />
        </>
      )}
    </>
  );
};
