/* eslint-disable react-hooks/exhaustive-deps */
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
  SvgIcon,
  TextField,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { TableProduct } from '../components/Products/table-productos';
import { Product } from '../interfaces/Product';
import { MeContext } from '../context/contextMe';
import { GetProducts } from '../api/products';
import { DialogoScreenFull } from '../components/DialogoScreenFull';
import { NewProduct } from '../components/Products/new-product';
import { DialogoForm } from '../components/DialogoForm';
import { ListCategory } from '../components/Products/list-category';
import { GetCategoryProduct } from '../api/category';
import { CategoryCountProduct } from '../interfaces/Category';
import { NewCategory } from '../components/Products/new-category';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  marginLeft: {
    marginRight: 10,
  },
}));

export const Products = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visibleProduct, setVisibleProduct] = useState<boolean>(false);
  const [visibleCategory, setVisibleCategory] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadPrducts, setReloadPrducts] = useState<boolean>(false);
  const [ReloadCategory, setReloadCategory] = useState<boolean>(false);
  const [SearchProduct, setSearchProduct] = useState<string>('');
  const [FetchProducts, setFetchProducts] = useState<Product[]>([]);
  const [FetchCategoryProduct, setFetchCategoryProduct] = useState<CategoryCountProduct[]>([]);

  const FetchCategory = async () => {
    try {
      const { categoryProducts } = await (await GetCategoryProduct({ token })).data;
      setFetchCategoryProduct(categoryProducts);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    const Fetch = async () => {
      try {
        const { products } = await (
          await GetProducts({ token, findProduct: SearchProduct || undefined })
        ).data;
        setFetchProducts(products);

        FetchCategory();

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    Fetch();

    if (ReloadPrducts) {
      setReloadPrducts(false);
    }
  }, [token, SearchProduct, ReloadPrducts]);

  useEffect(() => {
    if (ReloadCategory) {
      setReloadCategory(false);
      FetchCategory();
    }
  }, [ReloadCategory]);

  return (
    <>
      <Page className={classes.root} title='Productos'>
        <Container maxWidth='xl'>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              color='secondary'
              className={classes.marginLeft}
              variant='contained'
              onClick={() => setVisibleCategory(true)}
            >
              Categorias
            </Button>
            <Button color='secondary' variant='contained' onClick={() => setVisibleProduct(true)}>
              Nuevo producto
            </Button>
          </Box>
          <Box mt={3}>
            <Card>
              <CardContent>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    onChange={event => setSearchProduct(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SvgIcon fontSize='small' color='action'>
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder='Buscar producto'
                    variant='outlined'
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box mt={3}>
            <TableProduct
              products={FetchProducts}
              Loading={Loading}
              setReloadProduct={setReloadPrducts}
            />
          </Box>
        </Container>
      </Page>

      <DialogoScreenFull Open={visibleProduct} setOpen={setVisibleProduct}>
        <Box mt={3} p={1}>
          <NewProduct setOpen={setVisibleProduct} setReloadPrducts={setReloadPrducts} />
        </Box>
      </DialogoScreenFull>

      <DialogoForm
        title='Categoria y Productos'
        Open={visibleCategory}
        setOpen={setVisibleCategory}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <NewCategory />
          </Grid>
          <Grid item xs={12} md={9}>
            <ListCategory
              CategoryCountProduct={FetchCategoryProduct}
              setReloadCategory={setReloadCategory}
            />
          </Grid>
        </Grid>
      </DialogoForm>
    </>
  );
};
