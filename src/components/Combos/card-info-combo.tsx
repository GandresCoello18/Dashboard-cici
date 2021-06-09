/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Box,
  Button,
  makeStyles,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { NewCombo } from '../../interfaces/Combo';
import { DialogoForm } from '../DialogoForm';
import { FormAddProduct } from './form-add-product';
import { DialogoMessage } from '../DialogoMessage';
import { toast } from 'react-toast';
import { DeleteCombo } from '../../api/combo';
import { MeContext } from '../../context/contextMe';
import { FormUpdateCombo } from './form-edit-combo';

interface Props {
  combo: NewCombo;
  setReloadCombo: Dispatch<SetStateAction<boolean>>;
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

export const CardInfoCombo = ({ combo, setReloadCombo }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);

  const RemoveCombo = async () => {
    try {
      await DeleteCombo({ token, idCombo: combo.idCombo });
      toast.success('Se elimino el combo');

      setReloadCombo(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (AceptDialog) {
      RemoveCombo();
    }
  }, [AceptDialog]);

  return (
    <>
      <Card className={classes.cardCombo}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              ** <strong>{combo.name}</strong> **
            </Typography>
            <Typography gutterBottom>
              Precio: <strong>${combo.price}</strong>
              <br />
              Descuento: <strong>{combo.discount}%</strong>
              <br />
              Activo: <strong>{combo.active ? 'Si' : 'No'}</strong>
              <br />
              Vendidos: <strong>{combo.sold}</strong>
              <br />
              Creado el: <strong>{combo.created_at}</strong>
            </Typography>
            <hr />
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
        <FormAddProduct idCombo={combo.idCombo} setReloadCombo={setReloadCombo} />
      </DialogoForm>

      <DialogoForm Open={visibleEdit} setOpen={setVisibleEdit} title='Editar producto'>
        <FormUpdateCombo Combo={combo} setReloadCombo={setReloadCombo} />
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
