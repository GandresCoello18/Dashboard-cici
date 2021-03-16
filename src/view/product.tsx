/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { TableProduct } from '../components/Products/table-productos';
import { Product } from '../interfaces/Product';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const Products = () => {
  const classes = useStyles();
  const [Loading, setLoading] = useState<boolean>(false);
  const [SearchProduct, setSearchProduct] = useState<string>('');
  const [FetchProducts, setFetchProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);

    try {
      const Fetch = async () => {
        setFetchProducts([]);
      };

      Fetch();
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }, []);

  return (
    <Page className={classes.root} title='Productos'>
      <Container maxWidth={undefined}>
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
          <TableProduct SearchProduct={SearchProduct} products={FetchProducts} Loading={Loading} />
        </Box>
      </Container>
    </Page>
  );
};
