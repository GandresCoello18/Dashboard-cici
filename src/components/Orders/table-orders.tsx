/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  Chip,
  Card,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { OrdenProduct } from '../../interfaces/orden';

interface Props {
  Orders: OrdenProduct[];
  SearchOrden: string;
  Loading: boolean;
  setSelectOrder: Dispatch<SetStateAction<OrdenProduct | undefined>>;
}

export const TableOrders = ({ Orders, SearchOrden, Loading, setSelectOrder }: Props) => {
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => setPage(newPage);

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
                <TableCell>Creado el</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Orders.filter(item => {
                  return (
                    item.paymentId.toLowerCase().includes(SearchOrden.toLowerCase()) ||
                    item.paymentMethod.toLowerCase().includes(SearchOrden.toLowerCase())
                  );
                }).map(orden => (
                  <TableRow onClick={() => setSelectOrder(orden)} hover key={orden.idOrder}>
                    <TableCell>{orden.paymentMethod}</TableCell>
                    <TableCell>{orden.paymentId}</TableCell>
                    <TableCell>
                      <Chip
                        label={orden.status}
                        color={orden.status === 'Paid' ? 'secondary' : 'primary'}
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

          <TablePagination
            component='div'
            count={Orders.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
