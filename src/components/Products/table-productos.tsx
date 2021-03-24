/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
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
  TablePagination,
  makeStyles,
} from '@material-ui/core';
import getInitials from '../../util/getInitials';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Product } from '../../interfaces/Product';
import { Link } from 'react-router-dom';
import { BASE_API } from '../../api';
import { DialogoMessage } from '../DialogoMessage';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { DeleteProducto } from '../../api/products';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  products: Product[];
  Loading: boolean;
  setReloadProduct: Dispatch<SetStateAction<boolean>>;
}

export const TableProduct = ({ products, Loading, setReloadProduct }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [IdProduct, setProduct] = useState<string>('');
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => setPage(newPage);

  const SkeletonProduct = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  useEffect(() => {
    const FetchDelete = async () => {
      try {
        await DeleteProducto({ token, IdProduct });
        toast.success('Producto eliminado');
        setReloadProduct(true);

        setAceptDialog(false);
        setVisibleDialog(false);
        setProduct('');
      } catch (error) {
        toast.error(error.message);
      }
    };

    AceptDialog && IdProduct && FetchDelete();
  }, [AceptDialog, token, IdProduct, setReloadProduct]);

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
                {!Loading &&
                  products.map(product => (
                    <TableRow hover key={product.idProducts}>
                      <TableCell>
                        <Box alignItems='center' display='flex' maxWidth={400}>
                          <Avatar
                            className={classes.avatar}
                            src={`${BASE_API}/static/${product.source}`}
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

            {Loading && SkeletonProduct()}

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
