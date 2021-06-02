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
} from '@material-ui/core';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { AddProductCombo } from '../../api/combo';
import { GetSearchProduct } from '../../api/products';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Product } from '../../interfaces/Product';

interface Props {
  setReloadCombo: Dispatch<SetStateAction<boolean>>;
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
  }),
);

export const FormAddProduct = ({ setReloadCombo }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [products, setProducts] = useState<Product[]>([]);

  console.log(products);

  const SearchProduct = async () => {
    try {
      const { products } = await (await GetSearchProduct({ token: undefined, key: '' })).data;
      setProducts(products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const AddProduct = async () => {
    try {
      await AddProductCombo({ token, idProduct: '', idCombo: '' });
      setReloadCombo(true);

      toast.success('Producto agregado al combo');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <InputBase
        className={classes.input}
        placeholder='Nombre del producto'
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
        <CardHeader
          avatar={<Avatar aria-label='recipe'>R</Avatar>}
          title='Shrimp and Chorizo Paella'
        />

        <CardHeader
          avatar={<Avatar aria-label='recipe'>R</Avatar>}
          title='Shrimp and Chorizo Paella'
        />
      </Card>

      <Button
        className={classes.btnAdd}
        color='secondary'
        fullWidth
        variant='contained'
        onClick={AddProduct}
      >
        Agregar
      </Button>
    </>
  );
};
