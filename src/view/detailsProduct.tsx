/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  CardActionArea,
  Box,
  CardHeader,
  Card,
  Typography,
  Chip,
  CardMedia,
  CardContent,
  Divider,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Page from '../components/page';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toast';
import { ListImagen } from '../components/Products/Details/listImagen';
import { Product } from '../interfaces/Product';
import { GetProduct } from '../api/products';
import Skeleton from '@material-ui/lab/Skeleton';
import { BASE_API } from '../api';
import { Resenas } from '../components/Products/Details/resenas';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  media: {
    height: 240,
    width: '100%',
  },
}));

export const DetailsProduct = () => {
  const classes = useStyles();
  const params = useParams();
  const [Loading, setLoading] = useState<boolean>(false);
  const [Product, setProduct] = useState<Product>();

  useEffect(() => {
    setLoading(true);

    try {
      const FetchProduct = async () => {
        const { product } = await (
          await GetProduct({ token: undefined, idProduct: params.idProduct })
        ).data;
        setProduct(product);
      };

      params.idProduct && FetchProduct();
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }, [params]);

  return (
    <Page className={classes.root} title='Detalles'>
      <Container maxWidth='xl'>
        <Card className={classes.root}>
          <CardActionArea>
            {Loading ? (
              <Skeleton variant='rect' width='100%' height={218} />
            ) : (
              <CardMedia
                className={classes.media}
                image={`${BASE_API}/static/${Product?.source}`}
                title='Contemplative Reptile'
              />
            )}
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {Loading ? <Skeleton variant='text' /> : Product?.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {Loading ? (
                  <>
                    <Skeleton variant='text' width='80%' />
                    <Skeleton variant='text' />
                  </>
                ) : (
                  Product?.description
                )}
              </Typography>

              <br />
              <Divider />
              <br />

              <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Precio:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>${Product?.price}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Estado:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <Chip label={Product?.status} color='secondary' />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Disponibles:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.available}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Vendidas:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.sold}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Calificacion:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <Rating name='read-only' value={4} readOnly />
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Marca:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.brand}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Tamaño:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.size}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Modelo:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.model}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Creado el:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.created_at}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Descuento:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.discount}%</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Usuarios Calificados:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.starsPeople}</strong>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Fuentes:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.related_sources.length}</strong>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  {Loading ? (
                    <Grid
                      container
                      spacing={3}
                      direction='row'
                      justify='flex-start'
                      alignItems='center'
                    >
                      {[0, 1, 2, 3].map(index => (
                        <Grid item xs={12} md={1} key={index}>
                          <Skeleton variant='rect' width={100} height={100} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <>
                      Imagenes Relacionadas:{' '}
                      {Product && <ListImagen sources={Product.related_sources} />}
                    </>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>

        <br />

        <Card>
          <CardHeader title='Reseñas' />
          <Divider />

          <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
            <Box padding={5}>
              <Resenas idProduct={params.idProduct} />
            </Box>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};
