/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  Card,
  TableHead,
  TableRow,
  Avatar,
  makeStyles,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';
import getInitials from '../../util/getInitials';
import { ProductLottery } from '../../interfaces/lottery';

interface Props {
  Lottery: ProductLottery;
  Loading: boolean;
  setSelectProduct: Dispatch<SetStateAction<ProductLottery | undefined>>;
}

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const TableProductLottery = ({ Lottery, Loading, setSelectProduct }: Props) => {
  const classes = useStyles();

  const SkeletonProducts = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box width='100%'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Pecio</TableCell>
                <TableCell>Calificacion</TableCell>
                <TableCell>Descuento</TableCell>
                <TableCell>Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Lottery.products.map(product => (
                  <TableRow
                    hover
                    onClick={() => setSelectProduct(Lottery)}
                    key={product.idProducts}
                  >
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
                    <TableCell>{product.stars}</TableCell>
                    <TableCell>{product.discount}%</TableCell>
                    <TableCell>
                      <Link to={`/app/products/${product.idProducts}`}>
                        <Button size='small' variant='contained' color='primary'>
                          Detalles
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {Loading && SkeletonProducts()}

          {!Lottery.products.length && (
            <Alert severity='info'>
              Por el momento no hay <strong>Productos</strong> para mostrar.
            </Alert>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
