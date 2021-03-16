/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  SvgIcon,
  CardActions,
  Grid,
  Typography,
  CardActionArea,
  Button,
  CardMedia,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { Coupon } from '../interfaces/Coupon';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export const Coupons = () => {
  const classes = useStyles();
  const [Loading, setLoading] = useState<boolean>(false);
  const [SearchCoupon, setSearchCoupon] = useState<string>('');
  const [FetchCoupons, setFetchCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    setLoading(true);

    try {
      const Fetch = async () => {
        setFetchCoupons([]);
      };

      Fetch();
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }, []);

  const SkeletonCuopon = () => {
    return (
      <Grid container spacing={3}>
        {[0, 1, 2, 3].map(item => (
          <Grid item xs={12} md={4} lg={3} key={item}>
            <Skeleton style={{ padding: 15 }} variant='rect' width={280} height={180} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Page className={classes.root} title='Cupones'>
      <Container maxWidth={undefined}>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  fullWidth
                  onChange={event => setSearchCoupon(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar cupon'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Card style={{ padding: 20 }}>
            {Loading ? (
              SkeletonCuopon()
            ) : (
              <Grid container spacing={10}>
                {FetchCoupons.filter(item => {
                  return (
                    item.type.toLowerCase().includes(SearchCoupon.toLowerCase()) ||
                    item.descripcion.toLowerCase().includes(SearchCoupon.toLowerCase())
                  );
                }).map(coupon => (
                  <Grid item xs={12} md={4} lg={3} key={coupon.idCoupom}>
                    <Card className={classes.card} key={coupon.idCoupom}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image='/static/images/cards/contemplative-reptile.jpg'
                          title={coupon.type}
                        />
                        <CardContent>
                          <Typography gutterBottom variant='h5' component='h2'>
                            {coupon.type}
                          </Typography>
                          <Typography variant='body2' color='textSecondary' component='p'>
                            {coupon.descripcion}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size='small' color='primary'>
                          Share
                        </Button>
                        <Button size='small' color='primary'>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {!Loading && FetchCoupons.length === 0 && (
              <Alert severity='info'>
                Por el momento no hay <strong>Cupones</strong> para mostrar.
              </Alert>
            )}
          </Card>
        </Box>
      </Container>
    </Page>
  );
};
