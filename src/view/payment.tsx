/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  Button,
  List,
  Chip,
  Grid,
  ListItem,
  SvgIcon,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { GetOrdenPayment, GetPayment, RefundPayment } from '../api/payment';
import { AxiosError } from 'axios';
import { HandleError } from '../helpers/handleError';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  space: {
    marginLeft: 10,
  },
  title: {
    padding: 10,
    fontSize: 19,
    fontWeight: 500,
    borderBottom: '1px solid #606060',
  },
}));

export const PaymentPaypal = () => {
  const classes = useStyles();
  const [Loading, setLoading] = useState<boolean>(false);
  const [LoadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [LoadingRefund, setLoadingRefund] = useState<boolean>(false);
  const [SearchPayment, setSearchPayment] = useState<string>('');
  const [Payment, setPayment] = useState<any>(undefined);
  const [Orden, setOrden] = useState<any>(undefined);

  const Fetch = async () => {
    setLoading(true);
    setPayment(undefined);

    try {
      const payment = await (await GetPayment({ idPayment: SearchPayment })).data;

      setPayment(payment);
      setLoading(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  const DetailsOrden = async () => {
    const idOrden = Payment?.supplementary_data?.related_ids.order_id;
    setLoadingDetails(true);

    try {
      const orden = await (await GetOrdenPayment({ idOrden })).data;

      console.log(orden);
      setOrden(orden);
      setLoadingDetails(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoadingDetails(false);
    }
  };

  const Refund = async () => {
    setLoadingRefund(true);

    try {
      await RefundPayment({ idPayment: SearchPayment });
      setLoadingRefund(false);
    } catch (error) {
      setLoadingRefund(false);
      toast.error(HandleError(error as AxiosError));
    }
  };

  useEffect(() => {
    SearchPayment && Fetch();
  }, [SearchPayment]);

  return (
    <Page className={classes.root} title='Pagos'>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box mt={3}>
              <Card>
                <CardContent>
                  <Box maxWidth={500}>
                    <TextField
                      fullWidth
                      onChange={event => setSearchPayment(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SvgIcon fontSize='small' color='action'>
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder='Buscar pago'
                      variant='outlined'
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box mt={3}>
              <Card>
                <Grid container spacing={4} direction='row'>
                  <Grid item xs={12}>
                    {Loading && <CircularProgress color='secondary' />}

                    {!Loading && !Payment && (
                      <p style={{ textAlign: 'center' }}>
                        <img
                          src='../no-data.svg'
                          alt='no data payment'
                          width='50%'
                          style={{ padding: 10 }}
                        />
                        <br />

                        <Alert severity='info'>No hay datos de pago para mostrar.</Alert>
                      </p>
                    )}

                    {!Loading && Payment && (
                      <Box p={3}>
                        <p className={classes.title}>Detalles de la transacción</p>

                        <br />

                        <Grid container spacing={4} direction='row'>
                          <Grid item xs={12}>
                            <h1>
                              ${Payment?.amount.value} {Payment?.amount.currency_code}
                            </h1>
                          </Grid>
                          <List>
                            <ListItem>
                              <strong>ID:</strong>
                              <span className={classes.space}>{Payment?.id}</span>
                            </ListItem>

                            <ListItem>
                              <strong>Estado:</strong>
                              <Chip
                                label={Payment?.status}
                                color='secondary'
                                className={classes.space}
                              />
                            </ListItem>

                            <ListItem>
                              <strong>Creado el:</strong>
                              <span className={classes.space}>{Payment?.create_time}</span>
                            </ListItem>

                            <ListItem>
                              <strong>Actualizado el:</strong>
                              <span className={classes.space}>{Payment?.update_time}</span>
                            </ListItem>
                          </List>

                          <Grid item xs={12} />

                          <List>
                            <ListItem>
                              <strong>Total de compra:</strong>
                              <span className={classes.space}>
                                ${Payment?.seller_receivable_breakdown.gross_amount.value}{' '}
                                {Payment?.seller_receivable_breakdown.gross_amount.currency_code}
                              </span>
                            </ListItem>

                            <ListItem>
                              <strong>Tarifa de PayPal:</strong>
                              <span className={classes.space}>
                                ${Payment?.seller_receivable_breakdown.paypal_fee.value}{' '}
                                {Payment?.seller_receivable_breakdown.paypal_fee.currency_code}
                              </span>
                            </ListItem>

                            <ListItem>
                              <strong>Importe neto:</strong>
                              <span className={classes.space}>
                                ${Payment?.seller_receivable_breakdown.net_amount.value}{' '}
                                {Payment?.seller_receivable_breakdown.net_amount.currency_code}
                              </span>
                            </ListItem>
                          </List>

                          <Grid item xs={12} />

                          {!LoadingDetails && Orden && (
                            <>
                              <p className={classes.title}>Detalles del cliente</p>

                              <Grid item xs={12} />

                              <List>
                                <ListItem>
                                  <strong>Pais:</strong>
                                  <span className={classes.space}>
                                    {Orden?.payer?.address.country_code}
                                  </span>
                                </ListItem>

                                <ListItem>
                                  <strong>Nombres:</strong>
                                  <span className={classes.space}>
                                    {Orden?.payer?.name?.given_name} {Orden?.payer?.name?.surname}
                                  </span>
                                </ListItem>

                                <ListItem>
                                  <strong>Email:</strong>
                                  <span className={classes.space}>
                                    {Orden?.payer?.email_address}
                                  </span>
                                </ListItem>

                                <ListItem>
                                  <strong>Telefono:</strong>
                                  <span className={classes.space}>
                                    {Orden?.payer?.phone?.phone_number.national_number}
                                  </span>
                                </ListItem>
                              </List>
                            </>
                          )}

                          {Payment?.supplementary_data?.related_ids.order_id && !Orden && (
                            <Button
                              variant='contained'
                              disabled={LoadingDetails}
                              color='secondary'
                              onClick={DetailsOrden}
                            >
                              Detalles cliente
                            </Button>
                          )}

                          {Orden && <Grid item xs={12} />}
                          <Button
                            className={classes.space}
                            variant='contained'
                            color='primary'
                            disabled={LoadingRefund}
                            onClick={Refund}
                          >
                            Reembolsar
                          </Button>

                          {LoadingDetails && <CircularProgress color='secondary' />}
                        </Grid>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
