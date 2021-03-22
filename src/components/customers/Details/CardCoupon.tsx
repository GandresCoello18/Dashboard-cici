/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import {
  makeStyles,
  CardContent,
  Card,
  Chip,
  Box,
  CardHeader,
  Divider,
  ListItemText,
} from '@material-ui/core';
import { CouponAmount } from '../../../interfaces/Coupon';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

interface Props {
  AmountCoupons: CouponAmount[];
}

export const CardCoupons = ({ AmountCoupons }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title='Cupones' />
      <Divider />
      <CardContent className={classes.root}>
        {AmountCoupons.map(coupon => (
          <>
            <Box display='flex' key={coupon.type}>
              <ListItemText primary={coupon.type} />
              <Chip label={coupon.cantidad} color='secondary' />
            </Box>
            <Divider />
          </>
        ))}
      </CardContent>
    </Card>
  );
};
