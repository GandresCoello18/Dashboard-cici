/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Box,
  Button,
  Avatar,
  makeStyles,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DialogoMessage } from '../DialogoMessage';
import { toast } from 'react-toast';
import { DeleteCombo } from '../../api/combo';
import { MeContext } from '../../context/contextMe';
import { ProductLottery } from '../../interfaces/lottery';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';

interface Props {
  lottery: ProductLottery;
  setReloadSorteo: Dispatch<SetStateAction<boolean>>;
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
  degradado: {
    backgroundImage: 'linear-gradient(#edd7dc, #d907386e)',
  },
}));

export const CardInfoLottery = ({ lottery, setReloadSorteo }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);

  const RemoveLottery = async () => {
    try {
      await DeleteCombo({ token, idCombo: lottery.idLottery });
      toast.success('Se elimino el sorteo');

      setReloadSorteo(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (AceptDialog) {
      RemoveLottery();
    }
  }, [AceptDialog]);

  return (
    <>
      <Card className={classes.cardCombo}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h4' component='h2'>
              <strong>Sorteo #12</strong>
            </Typography>
            <Typography gutterBottom>
              Creado el: <strong>{lottery.created_at}</strong>
              <br />
              Finaliza el: <strong>{lottery.finish_at || 'Sin fecha'}</strong>
              <br />
              Estado: <strong>{lottery.status}</strong>
              <br />
            </Typography>
            {lottery.winner && (
              <>
                <hr />
                <Box alignItems='center' display='flex' justifyContent='center' p={2}>
                  <h2>Ganador</h2>
                </Box>
                <hr />
                <Box
                  className={classes.degradado}
                  alignItems='center'
                  display='flex'
                  flexDirection='column'
                  p={2}
                >
                  <Avatar
                    alt={lottery.winner.userName}
                    src={`${BASE_API_IMAGES_CLOUDINNARY_SCALE}/${lottery.winner.avatar}`}
                  />
                  <Typography color='textPrimary' variant='h5'>
                    {lottery.winner.userName}
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    {lottery.winner.email}
                  </Typography>
                </Box>
              </>
            )}
            {!lottery.winnerUser && (
              <>
                <hr />
                <Box mt={2} display='flex' justifyContent='flex-end'>
                  <Button
                    type='button'
                    className={classes.btnEdit}
                    onClick={() => console.log(true)}
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
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

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
