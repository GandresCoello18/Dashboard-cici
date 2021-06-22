/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Box,
  Button,
  Divider,
  makeStyles,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { DialogoForm } from '../DialogoForm';
import { DialogoMessage } from '../DialogoMessage';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { OfferTime } from '../../interfaces/TimeOffer';
import { DeleteTimeOffer } from '../../api/timeOffer';
import { FormAddProductTime } from './add-product-time';
import { FormUpdateCTime } from './edit-timeOffer';

interface Props {
  time: OfferTime;
  setReloadTime: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  cardCombo: {
    maxWidth: 345,
    marginBottom: 10,
  },
  btnDelete: {
    backgroundColor: 'pink',
    marginLeft: 10,
  },
  btnEdit: {
    backgroundColor: 'orange',
    marginLeft: 10,
  },
  btnAdd: {
    backgroundColor: '#6dd96d',
  },
}));

export const CardTimeOffert = ({ time, setReloadTime }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);

  const RemoveTime = async () => {
    try {
      await DeleteTimeOffer({ token, idTimeOffer: time.idOfferTime });
      toast.success('Se elimino el tiempo');

      setReloadTime(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (AceptDialog) {
      RemoveTime();
    }
  }, [AceptDialog]);

  return (
    <>
      <Card className={classes.cardCombo}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              <strong>{time.description}</strong>
            </Typography>
            <br />
            <Typography gutterBottom>
              Creado el: <strong>{time.created_at}</strong>
              <br />
              Termina el: <strong>{time.finish_at}</strong>
              <br />
              Estado: <strong>{time.status_offer_time}</strong>
            </Typography>
            <Divider />
            <Box mt={2} display='flex' justifyContent='flex-end'>
              <Button type='button' className={classes.btnAdd} onClick={() => setVisible(true)}>
                <AddIcon />
              </Button>
              <Button
                type='button'
                className={classes.btnEdit}
                onClick={() => setVisibleEdit(true)}
              >
                <EditIcon />
              </Button>
              <Button
                type='button'
                className={classes.btnDelete}
                onClick={() => setVisibleDialog(true)}
              >
                <DeleteIcon />
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <DialogoForm Open={visible} setOpen={setVisible} title='Agregar producto'>
        <FormAddProductTime setReloadTime={setReloadTime} idTime={time.idOfferTime} />
      </DialogoForm>

      <DialogoForm Open={visibleEdit} setOpen={setVisibleEdit} title='Editar tiempo'>
        <FormUpdateCTime Time={time} setReloadTime={setReloadTime} />
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
