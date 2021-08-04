/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Avatar,
  createStyles,
  makeStyles,
  InputBase,
  Divider,
  Chip,
} from '@material-ui/core';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { GetSearchProduct } from '../../api/products';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Product } from '../../interfaces/Product';
import Alert from '@material-ui/lab/Alert';
import getInitials from '../../util/getInitials';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';
import { AddProductTimeOffer } from '../../api/timeOffer';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

interface Props {
  setReloadTime: Dispatch<SetStateAction<boolean>>;
  idTime: string;
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginTop: 20,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    btnAdd: {
      marginTop: 20,
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    itemProduct: {
      cursor: 'pointer',
    },
  }),
);

export const FormAddProductTime = ({ setReloadTime, idTime }: Props) => {
  const classes = useStyles();
  const [KeyProduct, setKeyProduct] = useState<string>('');
  const [idProduct, setIdProduct] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(false);
  const [LoadingAdd, setLoadingAdd] = useState<boolean>(false);
  const { token } = useContext(MeContext);
  const [products, setProducts] = useState<Product[]>([]);

  const SearchProduct = async () => {
    if (!KeyProduct) {
      toast.warn('Escriba el nombre del producto a buscar');
      return;
    }

    setLoading(true);

    try {
      const { products } = await (await GetSearchProduct({ token: undefined, key: KeyProduct }))
        .data;
      setProducts(products);
      setLoading(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  const AddProduct = async () => {
    if (!idProduct) {
      toast.warn('Seleccione algun producto');
      return;
    }

    const findProduct = products.find(product => product.idProducts === idProduct);

    if (!findProduct?.discount) {
      toast.warn('El producto seleccionado debe de contener descuento');
      return;
    }

    setLoadingAdd(true);

    try {
      await AddProductTimeOffer({ token, data: { idProduct, idOfferTime: idTime } });
      setReloadTime(true);

      toast.success('Producto agregado al tiempo');
      setLoadingAdd(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoadingAdd(false);
    }
  };

  return (
    <>
      <InputBase
        className={classes.input}
        placeholder='Nombre del producto'
        onChange={event => setKeyProduct(event.target.value)}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        type='button'
        onClick={SearchProduct}
        className={classes.iconButton}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>

      <Divider />
      <Card className={classes.root}>
        {Loading && 'Buscando Productos...'}
        {!products.length && !Loading ? (
          <Alert severity='info'>
            No se encontraron <strong>Productos</strong> intente con otro nombre.
          </Alert>
        ) : (
          products.map(product => (
            <CardHeader
              onClick={() => !LoadingAdd && setIdProduct(product.idProducts)}
              key={product.idProducts}
              className={classes.itemProduct}
              style={
                idProduct === product.idProducts
                  ? { borderWidth: 1, borderStyle: 'solid', borderColor: 'red' }
                  : {}
              }
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={`${BASE_API_IMAGES_CLOUDINNARY_SCALE}/${product.source}`}
                >
                  {getInitials(product.title || 'NONE')}
                </Avatar>
              }
              title={product.title}
              action={
                <Chip
                  label={`-${product.discount}%`}
                  color={product.discount ? 'primary' : 'secondary'}
                />
              }
            />
          ))
        )}
      </Card>

      <Button
        className={classes.btnAdd}
        color='secondary'
        fullWidth
        disabled={LoadingAdd}
        variant='contained'
        onClick={AddProduct}
      >
        Agregar
      </Button>
    </>
  );
};
