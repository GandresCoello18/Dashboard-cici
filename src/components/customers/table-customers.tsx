/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext } from 'react';
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
import { Customers } from '../../interfaces/Customers';
import { Link } from 'react-router-dom';
import getInitials from '../../util/getInitials';
import { MeContext } from '../../context/contextMe';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  customers: Customers[];
  SearchClient: string;
  Loading: boolean;
}

export const TableCustomer = ({ customers, SearchClient, Loading }: Props) => {
  const classes = useStyles();
  const { me } = useContext(MeContext);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => setPage(newPage);

  const SkeletonCustomer = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  return (
    <Card>
      <Box minWidth={1050}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Registration date</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!Loading &&
              customers
                .filter(item => {
                  return (
                    item.userName.toLowerCase().includes(SearchClient.toLowerCase()) ||
                    item.email.toLowerCase().includes(SearchClient.toLowerCase())
                  );
                })
                .map(customer => (
                  <TableRow hover key={customer.idUser}>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        <Avatar className={classes.avatar} src={customer.avatar}>
                          {getInitials(customer.userName)}
                        </Avatar>
                        <Typography color='textPrimary' variant='body1'>
                          {customer.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.provider}</TableCell>
                    <TableCell>{customer.isAdmin || 'No'}</TableCell>
                    <TableCell>{customer.created_at}</TableCell>
                    <TableCell>
                      {me.idUser !== customer.idUser ? (
                        <>
                          <Link to={`/app/customers/${customer.idUser}`}>
                            <Button size='small' variant='contained' color='primary'>
                              Detalles
                            </Button>
                          </Link>
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
                        </>
                      ) : (
                        ''
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {Loading && SkeletonCustomer()}

        {!Loading && customers.length === 0 && (
          <Alert severity='info'>
            Por el momento no hay <strong>Clientes</strong> para mostrar.
          </Alert>
        )}

        <TablePagination
          component='div'
          count={customers.length}
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
