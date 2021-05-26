/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  Chip,
  Card,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { OrdenProduct } from '../../interfaces/orden';

interface Props {
  Orders: OrdenProduct[];
  Loading: boolean;
  setSelectOrder: Dispatch<SetStateAction<OrdenProduct | undefined>>;
}

export const TableOrders = ({ Orders, Loading, setSelectOrder }: Props) => {
  const SkeletonOrder = () => {
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
                <TableCell>Metodo</TableCell>
                <TableCell>ID de pago</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Enviado</TableCell>
                <TableCell>Creado el</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Orders.map(orden => (
                  <TableRow onClick={() => setSelectOrder(orden)} hover key={orden.idOrder}>
                    <TableCell>{orden.paymentMethod}</TableCell>
                    <TableCell>{orden.paymentId}</TableCell>
                    <TableCell>
                      <Chip
                        label={orden.status}
                        color={orden.status === 'Paid' ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={orden.sent ? 'Si' : 'No'}
                        color={orden.sent ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>{orden.created_at}</TableCell>
                    <TableCell>${orden.totalAmount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {Loading && SkeletonOrder()}

          {!Loading && Orders.length === 0 && (
            <Alert severity='info'>
              Por el momento no hay <strong>Ordenes</strong> para mostrar.
            </Alert>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
