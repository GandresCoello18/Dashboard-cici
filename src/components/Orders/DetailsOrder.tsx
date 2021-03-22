/* eslint-disable react/react-in-jsx-scope */
import {
  Avatar,
  Box,
  Chip,
  Card,
  Grid,
  Typography,
  makeStyles,
  Divider,
  Button,
} from '@material-ui/core';
import { BASE_API } from '../../api';
import { OrdenProduct } from '../../interfaces/orden';
import getInitials from '../../util/getInitials';
import Alert from '@material-ui/lab/Alert';
import { SelectUpdate } from './SelectUpdate';
import { DialogoMessage } from '../DialogoMessage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ModalElement } from '../ModalElment';
import { FormNewShipping } from '../Shipping/FormNewShipping';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  margen: {
    padding: 10,
    textAlign: 'center',
  },
}));

interface Props {
  Order: OrdenProduct | undefined;
  setReloadOrders: Dispatch<SetStateAction<boolean>>;
  isDetails?: boolean;
}

export const DetailsOrder = ({ Order, setReloadOrders, isDetails }: Props) => {
  const classes = useStyles();
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const [Modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (AceptDialog) {
      setModal(true);
      setVisibleDialog(false);
      setAceptDialog(false);
    }
  }, [AceptDialog]);

  return (
    <>
      <Card>
        {Order ? (
          <>
            <Box className={classes.margen}>
              <h3>Orden: 10548</h3>
            </Box>
            <Divider />
            <Box className={classes.margen}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={4}>
                  <Button style={{ color: 'red' }}>Eliminar</Button>
                </Grid>
                <Grid item xs={4}>
                  <SelectUpdate
                    ActualState={Order.status}
                    idOrden={Order.idOrder}
                    setReloadOrders={setReloadOrders}
                  />
                </Grid>
                {Order.status === 'Paid' && !Order.sent && (
                  <Grid item xs={4}>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => setVisibleDialog(true)}
                    >
                      Enviar
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Divider />
            <Box padding={3}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12}>
                  Metodo: <strong>{Order?.paymentMethod}</strong>
                </Grid>
                <Grid item xs={12}>
                  ID de pago: <strong>{Order?.paymentId}</strong>
                </Grid>
                <Grid item xs={12}>
                  Cupón: <strong>{Order?.id_user_coupons || 'No'}</strong>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box padding={3}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12}>
                  Creado: <strong>{Order?.created_at}</strong>
                </Grid>
                <Grid item xs={12}>
                  Ultimo movimiento: <strong>{Order?.update_at}</strong>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.margen}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={6}>
                  Productos: <strong>{Order?.product.length}</strong>
                </Grid>
                <Grid item xs={6}>
                  Envio: <strong>${Order?.shipping}</strong>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.margen}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={6}>
                  Descuento: <strong>{Order?.discount}%</strong>
                </Grid>
                <Grid item xs={6}>
                  Total: <strong>${Order?.totalAmount}</strong>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.margen}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={6}>
                  Estado:{' '}
                  <Chip
                    label={Order?.status}
                    color={Order?.status === 'Paid' ? 'secondary' : 'primary'}
                  />
                </Grid>
                <Grid item xs={6}>
                  Enviado:{' '}
                  <Chip
                    label={Order?.sent ? 'Si' : 'No'}
                    color={Order?.sent ? 'secondary' : 'primary'}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box className={classes.margen}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12}>
                  <Box alignItems='center' display='flex'>
                    <Avatar className={classes.avatar} src={Order?.user.avatar}>
                      {getInitials(Order?.user.userName || '')}
                    </Avatar>
                    <Typography color='textPrimary' variant='body1'>
                      {Order?.user.userName}, {Order?.user.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Box padding={3}>
              <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
                {Order?.product.map(product => (
                  <>
                    <Grid item xs={12} key={product.title}>
                      <img
                        width={100}
                        src={`${BASE_API}/static/${product.source}`}
                        alt={product.title}
                      />
                      <br />
                      <p>
                        Producto: <strong>{product.title}</strong>
                      </p>
                      <p>
                        Precio: <strong>${product.price}</strong>
                      </p>
                      <p>
                        Cantidad: <strong>{product.quantity}</strong>
                      </p>
                    </Grid>
                    <Divider />
                  </>
                ))}
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <img
              src={isDetails ? '../../no-data.svg' : '../no-data.svg'}
              alt='no data order'
              width='100%'
              style={{ padding: 10 }}
            />
            <Alert severity='info'>Selecciona alguna orden para ver mas detalles.</Alert>
          </>
        )}
      </Card>

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='Estas a punto de enviar o registrar un envio de orden, asegurate de haber enviado y obtendio la guia de rastreo y el nombre de la empresa de envios.'
      />

      <ModalElement visible={Modal} setVisible={setModal}>
        <FormNewShipping idOrder={Order?.idOrder} setReloadOrders={setReloadOrders} />
      </ModalElement>
    </>
  );
};
