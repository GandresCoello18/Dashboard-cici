/* eslint-disable react/react-in-jsx-scope */
import {
  CardContent,
  Card,
  CardActions,
  Grid,
  Select,
  CardActionArea,
  MenuItem,
  Button,
  Typography,
  makeStyles,
  CardMedia,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import { AxiosError } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useContext, useState } from 'react';
import { toast } from 'react-toast';
import { BASE_API_IMAGES_CLOUDINNARY } from '../../api';
import { DeleteCoupon } from '../../api/coupons';
import { MeContext } from '../../context/contextMe';
import { HandleError } from '../../helpers/handleError';
import { Coupon } from '../../interfaces/Coupon';

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

interface Props {
  Loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setReloadCoupon: Dispatch<SetStateAction<boolean>>;
  Coupons: Coupon[];
}

export const CardCoupons = ({ Loading, setLoading, setReloadCoupon, Coupons }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [IdCoupon, setIdCoupon] = useState<string>('');

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

  const RemoveCoupon = async (idCoupon: string) => {
    setLoading(true);

    try {
      await DeleteCoupon({ token, idCoupon });
      setLoading(false);

      setReloadCoupon(true);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  return (
    <Card style={{ padding: 20 }}>
      {Loading ? (
        SkeletonCuopon()
      ) : (
        <Grid container spacing={10}>
          {Coupons.map(coupon => (
            <Grid item xs={12} md={4} lg={3} key={coupon.idCoupon}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${BASE_API_IMAGES_CLOUDINNARY}/${coupon.source}`}
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
                  <Button
                    size='small'
                    onClick={() => RemoveCoupon(coupon.idCoupon)}
                    style={{ color: 'red' }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    size='small'
                    color='secondary'
                    onClick={() => setIdCoupon(coupon.idCoupon)}
                  >
                    {coupon.status}
                  </Button>
                  {IdCoupon === coupon.idCoupon && (
                    <Select
                      labelId='demo-controlled-open-select-label'
                      id='demo-controlled-open-select'
                      open={IdCoupon === coupon.idCoupon}
                      value=''
                      onClose={() => setIdCoupon('')}
                      onOpen={() => setIdCoupon(coupon.idCoupon)}
                      onChange={event => console.log(event.target.value)}
                      style={{ width: '80%' }}
                    >
                      <MenuItem value='Block'>Bloquear</MenuItem>
                      <MenuItem value='Active'>Activar</MenuItem>
                    </Select>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!Loading && Coupons.length === 0 && (
        <Alert severity='info'>
          Por el momento no hay <strong>Cupones</strong> para mostrar.
        </Alert>
      )}
    </Card>
  );
};
