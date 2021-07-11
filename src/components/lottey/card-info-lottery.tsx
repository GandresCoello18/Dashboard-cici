/* eslint-disable no-undef */
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
  CircularProgress,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { DialogoMessage } from '../DialogoMessage';
import { toast } from 'react-toast';
import Confetti from 'react-confetti';
import { DeleteCombo } from '../../api/combo';
import { MeContext } from '../../context/contextMe';
import { ProductLottery } from '../../interfaces/lottery';
import { DialogoForm } from '../DialogoForm';
import { GetUserWinnerLottery } from '../../api/lottery';
import { Customers } from '../../interfaces/Customers';
import { SourceAvatar } from '../../helpers/sourceAvatar';

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
  btnReset: {
    backgroundColor: '#ffeae8',
    marginLeft: 10,
  },
  btnEdit: {
    backgroundColor: 'orange',
    marginLeft: 10,
  },
  btnAdd: {
    backgroundColor: '#6dd96d',
  },
  btnWinner: {
    backgroundColor: '#86D169',
  },
  degradado: {
    backgroundImage: 'linear-gradient(#d907386e, #edd7dc)',
  },
}));

export const CardInfoLottery = ({ lottery, setReloadSorteo }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const [WinnerUser, setWinnerUser] = useState<Customers | undefined>(undefined);
  const [width] = useState<number>(window.innerWidth);

  const RemoveLottery = async () => {
    try {
      await DeleteCombo({ token, idCombo: lottery.idLottery });
      toast.success('Se elimino el sorteo');

      setReloadSorteo(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleWinner = async () => {
    setLoading(true);
    setVisible(true);

    try {
      const { winner } = await (await GetUserWinnerLottery({ token, idLoterry: lottery.idLottery }))
        .data;
      setWinnerUser(winner);
      setLoading(false);

      setTimeout(() => {
        setReloadSorteo(true);
      }, 10000);
    } catch (error) {
      setLoading(false);
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
                  <Avatar alt={lottery.winner.userName} src={SourceAvatar(lottery.winner.avatar)} />
                  <Typography color='textPrimary' variant='h5'>
                    {lottery.winner.userName}
                  </Typography>
                  <Typography color='textSecondary' variant='body2'>
                    {lottery.winner.email}
                  </Typography>
                </Box>
              </>
            )}
            {!lottery.winnerUser ? (
              <>
                <hr />
                <Box mt={2} display='flex' justifyContent='flex-end'>
                  <Button
                    type='button'
                    disabled={Loading}
                    className={classes.btnWinner}
                    onClick={handleWinner}
                  >
                    <EmojiEventsIcon />
                  </Button>
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
            ) : (
              <>
                <hr />
                <Box mt={2} display='flex' justifyContent='center'>
                  <Button
                    type='button'
                    fullWidth
                    disabled={Loading}
                    className={classes.btnReset}
                    onClick={handleWinner}
                  >
                    <AutorenewIcon /> Restaurar sorteo
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      <DialogoForm
        Open={visible}
        setOpen={setVisible}
        title={Loading ? 'Calculando ganador...' : 'Calculo terminado'}
      >
        {Loading && (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress color='secondary' />
          </Box>
        )}

        {!Loading && WinnerUser ? (
          <>
            <Confetti width={width / 3.2} height={300} />
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
              <Avatar alt={WinnerUser.userName} src={SourceAvatar(WinnerUser.avatar)} />
              <Typography color='textPrimary' variant='h5'>
                {WinnerUser.userName}
              </Typography>
              <Typography color='textSecondary' variant='body2'>
                {WinnerUser.email}
              </Typography>
            </Box>
          </>
        ) : (
          'No hay ganador seleccionado'
        )}
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
