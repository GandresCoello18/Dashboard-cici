/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useState } from 'react';
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
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Card className={classes.cardCombo}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              ** <strong>Lizard</strong> **
            </Typography>
            <Typography gutterBottom>
              Precio: <strong>${combo.price}</strong>
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
              <Button type='button' className={classes.btnEdit}>
                <EditIcon />
              </Button>
              <Button type='button' className={classes.btnDelete}>
                <DeleteIcon />
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <DialogoForm Open={visible} setOpen={setVisible} title='Agregar producto'>
        <FormAddProduct setReloadCombo={setReloadCombo} />
      </DialogoForm>
    </>
  );
};
