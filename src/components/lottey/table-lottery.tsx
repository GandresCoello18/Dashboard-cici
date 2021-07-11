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
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';
import getInitials from '../../util/getInitials';
import { ProductLottery } from '../../interfaces/lottery';
import { CardInfoLottery } from './card-info-lottery';

interface Props {
  Lottery: ProductLottery;
  setSelectProduct: Dispatch<SetStateAction<ProductLottery | undefined>>;
  setReloadSorteo: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const TableProductLottery = ({ Lottery, setSelectProduct, setReloadSorteo }: Props) => {
  const classes = useStyles();

  return (
    <>
      <CardInfoLottery lottery={Lottery} setReloadSorteo={setReloadSorteo} />
      <Card>
        <PerfectScrollbar>
          <Box width='100%'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Pecio</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Lottery.products.map(product => (
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
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.colour || 'No aplica'}</TableCell>
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

            {!Lottery.products.length && (
              <Alert severity='info'>
                Por el momento no hay <strong>Productos</strong> para mostrar.
              </Alert>
            )}
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};
