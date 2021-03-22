/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { Container, makeStyles, CardHeader, Grid, Card, Box, Divider } from '@material-ui/core';
import { CardAddress } from '../components/customers/Details/CardAddress';
import { CardCoupons } from '../components/customers/Details/CardCoupon';
import { CardProfile } from '../components/customers/Details/CardProfile';
import Page from '../components/page';
import { TableProduct } from '../components/Products/table-productos';
import { useContext, useEffect, useState } from 'react';
import { Customers } from '../interfaces/Customers';
import { toast } from 'react-toast';
import { useParams } from 'react-router';
import { GetUser } from '../api/users';
import { MeContext } from '../context/contextMe';
import { Addresses } from '../interfaces/Address';
import { GetAddressByUser } from '../api/address';
import Alert from '@material-ui/lab/Alert';
import { GetFavoriteByUser } from '../api/favorite';
import { Product } from '../interfaces/Product';
import { TableOrders } from '../components/Orders/table-orders';
import { DetailsOrder } from '../components/Orders/DetailsOrder';
import { OrdenProduct } from '../interfaces/orden';
import { GetOrdensByUser } from '../api/orders';
import { GetCouponsAmountByUser } from '../api/coupons';
import { CouponAmount } from '../interfaces/Coupon';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const DetailsCustomenr = () => {
  const classes = useStyles();
  const params = useParams();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadOrders, setReloadOrders] = useState<boolean>(false);
  const [User, setUser] = useState<Customers>();
  const [Address, setAddress] = useState<Addresses[]>([]);
  const [Favorites, setFavorites] = useState<Product[]>([]);
  const [FetchOrden, setFetchOrden] = useState<OrdenProduct[]>([]);
  const [FetchCouponAmount, setFetchCouponAmount] = useState<CouponAmount[]>([]);
  const [SelectOrder, setSelectOrder] = useState<OrdenProduct>();

  useEffect(() => {
    setLoading(true);

    const FetchUser = async () => {
      try {
        const { user } = await (await GetUser({ token, idUser: params.idUser })).data;
        setUser(user);

        const { address } = await (await GetAddressByUser({ token, idUser: params.idUser })).data;
        setAddress(address);

        const { products } = await (await GetFavoriteByUser({ token, idUser: params.idUser })).data;
        setFavorites(products);

        const { CouponsAmountAssing } = await (
          await GetCouponsAmountByUser({ token, idUser: params.idUser })
        ).data;
        setFetchCouponAmount(CouponsAmountAssing);

        GetOrders();

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    params.idUser && FetchUser();
  }, [params, token]);

  useEffect(() => {
    GetOrders();

    if (ReloadOrders) {
      setReloadOrders(false);
    }
  }, [ReloadOrders]);

  const GetOrders = async () => {
    try {
      const { ordenes } = await (await GetOrdensByUser({ token, idUser: params.idUser })).data;
      setFetchOrden(ordenes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Page className={classes.root} title={`Detalles de ${User?.userName}`}>
      <Container maxWidth='xl'>
        <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
          <Grid item xs={12} md={8}>
            <CardProfile User={User} Loading={Loading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardCoupons AmountCoupons={FetchCouponAmount} />
          </Grid>
        </Grid>

        <br />

        <Card>
          <CardHeader title='Direcciones' />
          <Divider />

          <Grid container spacing={3} direction='row' alignItems='center'>
            {Address.map(item => (
              <Grid item xs={12} style={{ padding: 20 }} key={item.idAddresses} md={4} lg={3}>
                <CardAddress Address={item} />
              </Grid>
            ))}

            {!Loading && Address.length === 0 && (
              <Alert severity='info'>
                Por el momento no hay <strong>Direcciones</strong> para mostrar.
              </Alert>
            )}
          </Grid>
        </Card>

        <br />

        <Card>
          <CardHeader title='Favoritos' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <TableProduct products={Favorites} Loading={Loading} />
            </Box>
          </Grid>
        </Card>

        <br />

        <Card>
          <CardHeader title='Últimas Ordenes' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Box mt={3}>
                    <TableOrders
                      Orders={FetchOrden}
                      Loading={Loading}
                      setSelectOrder={setSelectOrder}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <DetailsOrder Order={SelectOrder} setReloadOrders={setReloadOrders} isDetails />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};
