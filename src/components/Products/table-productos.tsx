/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
  Avatar,
  Box,
  Table,
  Button,
  TableBody,
  TableCell,
  Card,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  makeStyles,
} from '@material-ui/core';
import getInitials from '../../util/getInitials';
import Alert from '@material-ui/lab/Alert';
import { Product } from '../../interfaces/Product';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  products: Product[];
  SearchProduct: string;
  Loading: boolean;
}

export const TableProduct = ({ products, SearchProduct, Loading }: Props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => setPage(newPage);

  return (
    <Card>
      <Box minWidth={1050}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Pecio</TableCell>
              <TableCell>Disponible</TableCell>
              <TableCell>Vendidos</TableCell>
              <TableCell>Calificacion</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tamaño</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>Descuento</TableCell>
              <TableCell>Creado el</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter(item => {
                return (
                  item.title.toLowerCase().includes(SearchProduct.toLowerCase()) ||
                  item.description.toLowerCase().includes(SearchProduct.toLowerCase())
                );
              })
              .map(product => (
                <TableRow hover key={product.idProducts}>
                  <TableCell>
                    <Box alignItems='center' display='flex'>
                      <Avatar className={classes.avatar} src={product.source}>
                        {getInitials(product.title)}
                      </Avatar>
                      <Typography color='textPrimary' variant='body1'>
                        {product.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.available}</TableCell>
                  <TableCell>{product.sold}</TableCell>
                  <TableCell>{product.stars}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>{product.created_at}</TableCell>
                  <TableCell>
                    <Button size='small' variant='contained' color='primary'>
                      Editar
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                      size='small'
                      variant='contained'
                      onClick={() => {
                        /* setDialogo(true);
                        setIdUser(customer.idUser); */
                      }}
                    >
                      ELiminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {!Loading && products.length === 0 && (
          <Alert severity='info'>
            Por el momento no hay <strong>Productos</strong> para mostrar.
          </Alert>
        )}
        <TablePagination
          component='div'
          count={products.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>
    </Card>
  );
};
