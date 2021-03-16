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

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

export const CardCoupons = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title='Cupones' />
      <Divider />
      <CardContent className={classes.root}>
        <Box display='flex'>
          <ListItemText primary='+ 1 favorito' />
          <Chip label='3' color='secondary' />
        </Box>
        <Divider />
        <Box display='flex'>
          <ListItemText primary='15% Descuento' />
          <Chip label='1' color='secondary' />
        </Box>
        <Divider />
        <Box display='flex'>
          <ListItemText primary='Envio gratis' />
          <Chip label='1' color='secondary' />
        </Box>
        <Divider />
      </CardContent>
    </Card>
  );
};
