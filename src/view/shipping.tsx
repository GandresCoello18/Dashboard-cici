/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  Grid,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { GetShipping } from '../api/shipping';
import { MeContext } from '../context/contextMe';
import { TableShipping } from '../components/Shipping/tableShippong';
import { Shipping } from '../interfaces/Shipping';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const ShippingView = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadOrders, setReloadOrders] = useState<boolean>(false);
  const [SearchShipping, setSearchShipping] = useState<string>('');
  const [Shipping, setShipping] = useState<Shipping[]>([]);

  useEffect(() => {
    setLoading(true);

    const Fetch = async () => {
      try {
        const { shipping } = await (
          await GetShipping({ token, idPago: SearchShipping || undefined })
        ).data;
        setShipping(shipping);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    Fetch();

    if (ReloadOrders) {
      setReloadOrders(false);
    }
  }, [token, SearchShipping, ReloadOrders]);

  return (
    <Page className={classes.root} title='Envios'>
      <Container maxWidth='xl'>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={10}>
            <Box mt={3}>
              <Card>
                <CardContent>
                  <Box maxWidth={500}>
                    <TextField
                      fullWidth
                      onChange={event => setSearchShipping(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SvgIcon fontSize='small' color='action'>
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder='Buscar por ID de pago'
                      variant='outlined'
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box mt={3}>
              <TableShipping Shipping={Shipping} Loading={Loading} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
