/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { Container, makeStyles, CardHeader, Grid, Card, Box, Divider } from '@material-ui/core';
import { CardAddress } from '../components/customers/Details/CardAddress';
import { CardCoupons } from '../components/customers/Details/CardCoupon';
import { CardProfile } from '../components/customers/Details/CardProfile';
import Page from '../components/page';
import { TableProduct } from '../components/Products/table-productos';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const DetailsCustomenr = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Detalles'>
      <Container maxWidth='xl'>
        <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
          <Grid item xs={12} md={8}>
            <CardProfile />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardCoupons />
          </Grid>
        </Grid>

        <br />

        <Card>
          <CardHeader title='Direcciones' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            {[0, 1, 2, 3].map(item => (
              <Grid item xs={12} style={{ padding: 20 }} key={item} md={4} lg={3}>
                <CardAddress />
              </Grid>
            ))}
          </Grid>
        </Card>

        <br />

        <Card>
          <CardHeader title='Favoritos' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <TableProduct products={[]} SearchProduct='' Loading={false} />
            </Box>
          </Grid>
        </Card>

        <br />

        <Card>
          <CardHeader title='Últimas Ordenes' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <TableProduct products={[]} SearchProduct='' Loading={false} />
            </Box>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};
