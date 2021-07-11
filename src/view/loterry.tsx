/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  makeStyles,
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import Page from '../components/page';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import { TableProductLottery } from '../components/lottey/table-lottery';
import { ProductLottery } from '../interfaces/lottery';
import { CardProduct } from '../components/Products/card-product';
import { DialogoForm } from '../components/DialogoForm';
import { toast } from 'react-toast';
import { NewFormLottery } from '../components/lottey/new-lottery';
import Alert from '@material-ui/lab/Alert';
import { Product } from '../interfaces/Product';
import { GetProductCart } from '../api/cart';
import { MeContext } from '../context/contextMe';
import { GetLotterys } from '../api/lottery';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const LoterryView = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchSorteo, setSearchSorteo] = useState<string>('');
  const [Sorteos, setSorteos] = useState<ProductLottery[]>([]);
  const [CartProducts, setCartProducts] = useState<Product[]>([]);
  const [ReloadSorteo, setReloadSorteo] = useState<boolean>(false);
  const [ReloadCart, setReloadCart] = useState<boolean>(false);
  const [selectSorteo, setSelectSorteo] = useState<ProductLottery | undefined>(undefined);

  useEffect(() => {
    console.group(visible, searchSorteo, selectSorteo, ReloadSorteo);
  }, [ReloadSorteo]);

  const fetchCart = async () => {
    try {
      const { products } = await (await GetProductCart({ token })).data;
      setCartProducts(products);
    } catch (error) {
      toast.warn(error.message);
    }
  };

  const fetchLotterys = async () => {
    setLoading(true);

    try {
      const { lotterys } = await (await GetLotterys({ token })).data;
      setSorteos(lotterys);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchLotterys();
  }, []);

  useEffect(() => {
    if (ReloadCart) {
      fetchCart();
      setReloadCart(false);
    }

    if (ReloadSorteo) {
      fetchLotterys();
      fetchCart();
      setReloadSorteo(false);
    }
  }, [ReloadCart, ReloadSorteo]);

  const SkeletonProducts = () => {
    return [0, 1, 2, 3, 4, 5].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  return (
    <Page className={classes.root} title='Sorteos'>
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo sorteo
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  fullWidth
                  onChange={event => setSearchSorteo(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar sorteo'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Productos en mi carrito</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} direction='row' alignItems='center'>
                {CartProducts.map(product => (
                  <Grid item xs={12} md={4} lg={3} key={product.idProducts}>
                    <CardProduct product={product} setReloadCart={setReloadCart} />
                  </Grid>
                ))}

                {!CartProducts.length && (
                  <Alert severity='info'>
                    No hay productos en el <strong>Carrito de compras</strong> para mostrar.
                  </Alert>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={3} mb={4}>
          {!Loading &&
            Sorteos.map(item => (
              <TableProductLottery
                Lottery={item}
                setReloadSorteo={setReloadSorteo}
                setSelectProduct={setSelectSorteo}
                key={item.idLottery}
              />
            ))}

          {Loading && SkeletonProducts()}
        </Box>

        <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo sorteo'>
          <NewFormLottery setReloadSorteo={setReloadSorteo} isCart={CartProducts.length} />
        </DialogoForm>
      </Container>
    </Page>
  );
};
