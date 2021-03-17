/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  Button,
  CardContent,
  Card,
  Grid,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { ModalElement } from '../components/ModalElment';
import { GetOrdens } from '../api/orders';
import { MeContext } from '../context/contextMe';
import { OrdenProduct } from '../interfaces/orden';
import { TableOrders } from '../components/Orders/table-orders';
import { DetailsOrder } from '../components/Orders/DetailsOrder';

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
  const [Modal, setModal] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [SearchOrden, setSearchOrden] = useState<string>('');
  const [SelectOrder, setSelectOrder] = useState<OrdenProduct>();
  const [FetchOrden, setFetchOrden] = useState<OrdenProduct[]>([]);

  useEffect(() => {
    setLoading(true);

    try {
      const Fetch = async () => {
        const { ordenes } = await (await GetOrdens({ token })).data;
        setFetchOrden(ordenes);
      };

      Fetch();
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }, [token]);

  return (
    <Page className={classes.root} title='Clientes'>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Box display='flex' justifyContent='flex-end'>
              <Button color='secondary' variant='contained' onClick={() => setModal(true)}>
                Nueva Orden
              </Button>
            </Box>
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
              <TableOrders
                Orders={FetchOrden}
                SearchOrden={SearchOrden}
                Loading={Loading}
                setSelectOrder={setSelectOrder}
              />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DetailsOrder Order={SelectOrder} />
          </Grid>
        </Grid>
      </Container>

      <ModalElement visible={Modal} setVisible={setModal}>
        dfef
      </ModalElement>
    </Page>
  );
};
