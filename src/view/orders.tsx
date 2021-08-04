/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  Grid,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { GetOrdens } from '../api/orders';
import { MeContext } from '../context/contextMe';
import { OrdenProduct } from '../interfaces/orden';
import { TableOrders } from '../components/Orders/table-orders';
import { DetailsOrder } from '../components/Orders/DetailsOrder';
import { AxiosError } from 'axios';
import { HandleError } from '../helpers/handleError';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const Ordens = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Count, setCount] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadOrders, setReloadOrders] = useState<boolean>(false);
  const [SearchOrden, setSearchOrden] = useState<string>('');
  const [SelectOrder, setSelectOrder] = useState<OrdenProduct>();
  const [FetchOrden, setFetchOrden] = useState<OrdenProduct[]>([]);

  const Fetch = async (page: number) => {
    setLoading(true);

    try {
      const { ordenes, pages } = await (
        await GetOrdens({ token, idPago: SearchOrden || undefined, page })
      ).data;

      setFetchOrden(ordenes);
      setCount(pages);

      setLoading(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch(1);

    if (ReloadOrders) {
      setReloadOrders(false);
    }
  }, [token, SearchOrden, ReloadOrders]);

  const SelectItemPagination = (page: number) => Fetch(page);

  return (
    <Page className={classes.root} title='Ordenes'>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box mt={3}>
              <Card>
                <CardContent>
                  <Box maxWidth={500}>
                    <TextField
                      fullWidth
                      onChange={event => setSearchOrden(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SvgIcon fontSize='small' color='action'>
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder='Buscar orden'
                      variant='outlined'
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box mt={3}>
              <TableOrders Orders={FetchOrden} Loading={Loading} setSelectOrder={setSelectOrder} />
            </Box>
            <Box mt={3} display='flex' justifyContent='center'>
              <Pagination
                count={Count}
                color='secondary'
                onChange={(event, page) => SelectItemPagination(page)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DetailsOrder Order={SelectOrder} setReloadOrders={setReloadOrders} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
