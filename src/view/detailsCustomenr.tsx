/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import {
  Container,
  makeStyles,
  CardHeader,
  Grid,
  Card,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import { CardAddress } from '../components/customers/Details/CardAddress';
import { CardCoupons } from '../components/customers/Details/CardCoupon';
import { CardProfile } from '../components/customers/Details/CardProfile';
import Page from '../components/page';
import { TableProduct } from '../components/Products/table-productos';
import { useContext, useEffect, useState } from 'react';
import { Customers } from '../interfaces/Customers';
import { toast } from 'react-toast';
import { useParams } from 'react-router';
import { DeleteUser, GetUser } from '../api/users';
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
import { DialogoMessage } from '../components/DialogoMessage';
import { DialogoForm } from '../components/DialogoForm';
import { ResetPasswordEmail } from '../components/customers/Details/changePassword';
import { EditCustomer } from '../components/customers/Details/editCustomers';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  btnDelete: {
    color: 'red',
    marginLeft: 10,
  },
  btnEdit: {
    backgroundColor: 'orange',
    marginLeft: 10,
  },
}));

export const DetailsCustomenr = () => {
  const classes = useStyles();
  const params = useParams();
  const { token } = useContext(MeContext);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [VisibleDialogForm, setVisibleDialogForm] = useState<boolean>(false);
  const [VisibleDialogFormEdit, setVisibleDialogFormEdit] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadOrders, setReloadOrders] = useState<boolean>(false);
  const [ReloadFav, setReloadFav] = useState<boolean>(false);
  const [ReloadUser, setReloadUser] = useState<boolean>(false);
  const [User, setUser] = useState<Customers>();
  const [Address, setAddress] = useState<Addresses[]>([]);
  const [Favorites, setFavorites] = useState<Product[]>([]);
  const [FetchOrden, setFetchOrden] = useState<OrdenProduct[]>([]);
  const [FetchCouponAmount, setFetchCouponAmount] = useState<CouponAmount[]>([]);
  const [SelectOrder, setSelectOrder] = useState<OrdenProduct>();

  const FetchUser = async () => {
    try {
      const { user } = await (await GetUser({ token, idUser: params.idUser })).data;
      setUser(user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (ReloadUser) {
      FetchUser();
      setReloadUser(false);
      setVisibleDialogFormEdit(false);
    }
  }, [ReloadUser]);

  useEffect(() => {
    setLoading(true);

    FetchUser();

    const FetchDetailUser = async () => {
      try {
        const { address } = await (await GetAddressByUser({ token, idUser: params.idUser })).data;
        setAddress(address);

        const { CouponsAmountAssing } = await (
          await GetCouponsAmountByUser({ token, idUser: params.idUser })
        ).data;
        setFetchCouponAmount(CouponsAmountAssing);

        GetOrders();
        GetFavorite();

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    params.idUser && FetchDetailUser();
  }, [params, token]);

  useEffect(() => {
    if (ReloadOrders) {
      setReloadOrders(false);
      GetOrders();
    }
  }, [ReloadOrders]);

  useEffect(() => {
    if (ReloadFav) {
      setReloadFav(false);
      GetFavorite();
    }
  }, [ReloadFav]);

  const GetFavorite = async () => {
    try {
      const { products } = await (await GetFavoriteByUser({ token, idUser: params.idUser })).data;
      setFavorites(products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const GetOrders = async () => {
    try {
      const { ordenes } = await (await GetOrdensByUser({ token, idUser: params.idUser })).data;
      setFetchOrden(ordenes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const FetchDelete = async () => {
      try {
        await DeleteUser({ token, IdUser: params.idUser });
        toast.success('Usuario eliminado');

        setAceptDialog(false);
        setVisibleDialog(false);

        window.location.href = '/app/customers';
      } catch (error) {
        toast.error(error.message);
      }
    };

    AceptDialog && params.idUser && FetchDelete();
  }, [AceptDialog, token]);

  return (
    <Page className={classes.root} title={`Detalles de ${User?.userName}`}>
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='flex-end' mb={1}>
          {User?.provider === 'cici' ? (
            <Button
              color='secondary'
              variant='contained'
              onClick={() => setVisibleDialogForm(true)}
            >
              Cambiar contraseña
            </Button>
          ) : (
            ''
          )}
          <Button
            className={classes.btnEdit}
            variant='contained'
            onClick={() => setVisibleDialogFormEdit(true)}
          >
            Editar
          </Button>
          <Button
            className={classes.btnDelete}
            variant='contained'
            onClick={() => setVisibleDialog(true)}
          >
            Eliminar
          </Button>
        </Box>
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
              <Grid item>
                <Alert severity='info'>
                  Por el momento no hay <strong>Direcciones</strong> para mostrar.
                </Alert>
              </Grid>
            )}
          </Grid>
        </Card>

        <br />

        <Card>
          <CardHeader title='Favoritos' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <TableProduct
                products={Favorites}
                Loading={Loading}
                setReloadProduct={setReloadFav}
              />
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

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
      />

      <DialogoForm Open={VisibleDialogForm} setOpen={setVisibleDialogForm} title=''>
        <ResetPasswordEmail email={User?.email || ''} />
      </DialogoForm>

      <DialogoForm Open={VisibleDialogFormEdit} setOpen={setVisibleDialogFormEdit} title=''>
        {User && <EditCustomer User={User} setReloadUser={setReloadUser} />}
      </DialogoForm>
    </Page>
  );
};
