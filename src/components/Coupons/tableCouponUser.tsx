/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Table,
  TableBody,
  makeStyles,
  TableCell,
  Card,
  Chip,
  Avatar,
  Typography,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import PerfectScrollbar from 'react-perfect-scrollbar';
import getInitials from '../../util/getInitials';
import { CouponsAssing } from '../../interfaces/Coupon';
import { SourceAvatar } from '../../helpers/sourceAvatar';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

interface Props {
  Coupons: CouponsAssing[];
  Loading: boolean;
}

export const TableCouponUser = ({ Coupons, Loading }: Props) => {
  const classes = useStyles();

  const SkeletonCoupons = () => {
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
                <TableCell>Usado por</TableCell>
                <TableCell>Cupon</TableCell>
                <TableCell>Invitado por</TableCell>
                <TableCell>Creado el</TableCell>
                <TableCell>Expira el</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Loading &&
                Coupons.map(cupon => (
                  <TableRow hover key={cupon.id_user_coupons}>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        <Avatar className={classes.avatar} src={SourceAvatar(cupon.avatar || '')}>
                          {getInitials(cupon.userName || 'NONE')}
                        </Avatar>
                        <Typography color='textPrimary' variant='body1'>
                          {cupon.userName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={cupon.type || 'None'}
                        color={cupon.type ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>
                      <Box alignItems='center' display='flex'>
                        <Avatar className={classes.avatar} src={cupon.user_avatar_invita || ''}>
                          {getInitials(cupon.user_name_invita || 'NONE')}
                        </Avatar>
                        <Typography color='textPrimary' variant='body1'>
                          {cupon.user_name_invita || 'NONE'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{cupon.created_at}</TableCell>
                    <TableCell>{cupon.expiration_date}</TableCell>
                    <TableCell>{cupon.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {Loading && SkeletonCoupons()}

          {!Loading && Coupons.length === 0 && (
            <Alert severity='info'>
              Por el momento no hay <strong>Cupones de usuarios</strong> para mostrar.
            </Alert>
          )}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
