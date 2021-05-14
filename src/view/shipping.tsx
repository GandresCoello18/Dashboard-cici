/* eslint-disable react-hooks/exhaustive-deps */
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
import Pagination from '@material-ui/lab/Pagination';
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
  const [Count, setCount] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadShipping, setReloadShipping] = useState<boolean>(false);
  const [SearchShipping, setSearchShipping] = useState<string>('');
  const [Shipping, setShipping] = useState<Shipping[]>([]);

  const Fetch = async (page: number) => {
    try {
      const { shipping, pages } = await (
        await GetShipping({ token, idPago: SearchShipping || undefined, page })
      ).data;

      setShipping(shipping);
      setCount(pages);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    Fetch(1);

    if (ReloadShipping) {
      setReloadShipping(false);
    }
  }, [token, SearchShipping, ReloadShipping]);

  const SelectItemPagination = (page: number) => Fetch(page);

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
                      placeholder='Buscar por ID de pago o Guia'
                      variant='outlined'
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box mt={3}>
              <TableShipping
                Shipping={Shipping}
                Loading={Loading}
                setReloadShipping={setReloadShipping}
              />
            </Box>
            <Box mt={3} display='flex' justifyContent='center'>
              <Pagination
                count={Count}
                color='secondary'
                onChange={(event, page) => SelectItemPagination(page)}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
