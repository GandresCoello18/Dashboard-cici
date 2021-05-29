/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Table,
  Button,
  TableBody,
  TableCell,
  Chip,
  Card,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from '../../util/getInitials';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';
import { DialogoMessage } from '../DialogoMessage';
import { Product } from '../../interfaces/Product';

interface Props {
  products: Product[];
}

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const TableProductCombo = ({ products }: Props) => {
  const classes = useStyles();
  const [IdProduct, setProduct] = useState<string>('');
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log(AceptDialog, IdProduct);
  }, [AceptDialog, IdProduct]);

  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box width='100%'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Pecio</TableCell>
                  <TableCell>Disponible</TableCell>
                  <TableCell>Vendidos</TableCell>
                  <TableCell>Calificacion</TableCell>
                  <TableCell>Descuento</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Creado</TableCell>
                  <TableCell>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow hover key={product.idProducts}>
                    <TableCell>
                      <Box alignItems='center' display='flex' maxWidth={400}>
                        <Avatar
                          className={classes.avatar}
                          src={`${BASE_API_IMAGES_CLOUDINNARY_SCALE}/${product.source}`}
                        >
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
                    <TableCell>{product.discount}%</TableCell>
                    <TableCell>
                      <Chip label={product.status} color='secondary' />
                    </TableCell>
                    <TableCell>{product.created_at}</TableCell>
                    <TableCell>
                      <Link to={`/app/products/${product.idProducts}`}>
                        <Button size='small' variant='contained' color='primary'>
                          Detalles
                        </Button>
                      </Link>
                      <br />
                      <br />
                      <Button
                        size='small'
                        variant='contained'
                        onClick={() => {
                          setVisibleDialog(true);
                          setProduct(product.idProducts);
                        }}
                      >
                        ELiminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {[].length === 0 && (
              <Alert severity='info'>
                Por el momento no hay <strong>Productos</strong> para mostrar.
              </Alert>
            )}
          </Box>
        </PerfectScrollbar>
      </Card>

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
      />
    </>
  );
};
