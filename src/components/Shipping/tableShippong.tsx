/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  makeStyles,
  Chip,
  Button,
  Avatar,
  Typography,
  Card,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { Shipping } from '../../interfaces/Shipping';
import getInitials from '../../util/getInitials';
import { UpdateStatusShipping } from '../../api/shipping';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import DoneIcon from '@material-ui/icons/Done';
import { SourceAvatar } from '../../helpers/sourceAvatar';

interface Props {
  Loading: boolean;
  Shipping: Shipping[];
  setReloadShipping: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

export const TableShipping = ({ Loading, Shipping, setReloadShipping }: Props) => {
  const classes = useStyles();

  const { token } = useContext(MeContext);
  const [LoadingUpdate, setLoading] = useState<boolean>(false);

  const SkeletonShipping = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  const validateStatus = (status: string) => {
    if (status === 'Sent') {
      return 'Entregado';
    }
    return 'Enviado';
  };

  const handleStatusShipping = async (idShipping: string, status: string) => {
    setLoading(true);

    try {
      await UpdateStatusShipping({
        token,
        status: validateStatus(status) === 'Entregado' ? 'Delivered' : 'Sent',
        idShipping,
      });

      setReloadShipping(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const renderGuideExpress = (method: string, guide: string) => {
    switch (method) {
      case 'ServiEntrega':
        return (
          <a
            href={`https://www.servientrega.com.ec/rastreo/guia/${guide}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {guide || 'NONE'}
          </a>
        );
      case 'Tramaco':
        return (
          <a
            href='https://www.tramaco.com.ec/rastrear-envio/'
            target='_blank'
            rel='noopener noreferrer'
          >
            {guide || 'NONE'}
          </a>
        );
      case 'Urbano':
        return (
          <a href='https://www.urbano.com.ec/' target='_blank' rel='noopener noreferrer'>
            {guide || 'NONE'}
          </a>
        );
      default:
        return 'NONE';
    }
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
                <TableCell>Actualizado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Shipping.map(envio => (
                  <TableRow hover key={envio.idShipping}>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        <Avatar className={classes.avatar} src={SourceAvatar(envio.avatar)}>
                          {getInitials(envio.userName)}
                        </Avatar>
                        <Typography color='textPrimary' variant='body1'>
                          {envio.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{envio.method ? <Chip label={envio.method} /> : 'None'}</TableCell>
                    <TableCell>{renderGuideExpress(envio.method, envio.guide)}</TableCell>
                    <TableCell>
                      <Chip
                        label={envio.status}
                        color={envio.status === 'Delivered' ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>{envio.created_at}</TableCell>
                    <TableCell>
                      {envio.update_at === envio.created_at ? 'Ninguno' : envio.update_at}
                    </TableCell>
                    <TableCell>
                      {envio.status === 'Delivered' ? (
                        <Chip label={<DoneIcon />} color='secondary' />
                      ) : (
                        <Button
                          variant='contained'
                          disabled={LoadingUpdate}
                          color='secondary'
                          onClick={() => handleStatusShipping(envio.idShipping, envio.status)}
                        >
                          {LoadingUpdate ? 'Cargando...' : validateStatus(envio.status)}
                        </Button>
                      )}
                    </TableCell>
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
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
