/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  makeStyles,
  Chip,
  Avatar,
  Typography,
  Card,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { Shipping } from '../../interfaces/Shipping';
import getInitials from '../../util/getInitials';

interface Props {
  Loading: boolean;
  Shipping: Shipping[];
}

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const TableShipping = ({ Loading, Shipping }: Props) => {
  const classes = useStyles();

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => setPage(newPage);

  const SkeletonShipping = () => {
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
                <TableCell>Cliente</TableCell>
                <TableCell>Metodo</TableCell>
                <TableCell>Guia</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Creado el</TableCell>
                <TableCell>ID de pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Shipping.map(envio => (
                  <TableRow hover key={envio.idShipping}>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        <Avatar className={classes.avatar} src={envio.avatar || ''}>
                          {getInitials(envio.userName)}
                        </Avatar>
                        <Typography color='textPrimary' variant='body1'>
                          {envio.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{envio.method ? <Chip label={envio.method} /> : 'None'}</TableCell>
                    <TableCell>
                      {envio.guide ? (
                        <a
                          href={`https://www.servientrega.com.ec/rastreo/guia/${envio.guide}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {envio.guide}
                        </a>
                      ) : (
                        'None'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={envio.status}
                        color={envio.status === 'delivered' ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>{envio.created_at}</TableCell>
                    <TableCell>{envio.paymentId}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {Loading && SkeletonShipping()}

          {!Loading && Shipping.length === 0 && (
            <Alert severity='info'>
              Por el momento no hay <strong>Envios</strong> para mostrar.
            </Alert>
          )}

          <TablePagination
            component='div'
            count={Shipping.length}
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
