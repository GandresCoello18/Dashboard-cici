/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import { useContext, useEffect, useState } from 'react';
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
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Page from '../components/page';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toast';
import { ListImagen } from '../components/Products/Details/listImagen';
import { Product } from '../interfaces/Product';
import { GetProduct, MoreSourcesProducto } from '../api/products';
import Skeleton from '@material-ui/lab/Skeleton';
import { BASE_API_IMAGES_CLOUDINNARY } from '../api';
import { Resenas } from '../components/Products/Details/resenas';
import { ImageListType } from 'react-images-uploading';
import { UploadImage } from '../components/UploadImage';
import { MeContext } from '../context/contextMe';
import Recibidos from '../components/Products/Details/staticsRecibido';
import { GetStatisticProduct } from '../api/statistic';
import { StatisticProduct } from '../interfaces/Statistics';
import Recomendado from '../components/Products/Details/staticsRecomendado';
import { DialogoMessage } from '../components/DialogoMessage';
import { DialogoForm } from '../components/DialogoForm';
import { AddCategory } from '../components/Products/Details/addCategory';
import { DeleteProductCategory } from '../api/category';

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
  btnDelete: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnEdit: {
    background: 'orange',
  },
  TextDelete: {
    color: 'red',
    padding: 3,
  },
}));

export const DetailsProduct = () => {
  const [images, setImages] = useState<ImageListType | any>([]);
  const [StatiscProduct, setStatisticProduct] = useState<StatisticProduct>();
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const params = useParams();
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadProduct, setReloadProduct] = useState<boolean>(false);
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [visibleAddCategory, setVisibleAddCategory] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const [IsMoreUpload, setIsMoreUpload] = useState<boolean>(false);
  const [Product, setProduct] = useState<Product>();

  console.log(AceptDialog);

  useEffect(() => {
    setLoading(true);
    if (params.idProduct) {
      FetchProduct();
      FetchStatisticProduct();
    }
  }, [params]);

  useEffect(() => {
    setLoading(true);
    if (ReloadProduct) {
      FetchProduct();
      setReloadProduct(false);
      setVisibleAddCategory(false);
    }
  }, [ReloadProduct]);

  const FetchStatisticProduct = async () => {
    setLoading(true);

    try {
      const { StatisticsReview } = await (
        await GetStatisticProduct({ token, idProduct: params.idProduct })
      ).data;
      setStatisticProduct(StatisticsReview);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const FetchProduct = async () => {
    try {
      const { product } = await (
        await GetProduct({ token: undefined, idProduct: params.idProduct })
      ).data;
      setProduct(product);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const onChange = (imageList: ImageListType) => setImages(imageList as never[]);

  const uploadSources = async () => {
    setLoading(true);

    const sources: FormData = new FormData();
    const onlyFiles = images.map((img: any) => img.file);

    onlyFiles.map((file: any) => sources.append('more_sources', file));
    sources.append('idProduct', params.idProduct);

    try {
      await MoreSourcesProducto({ token, data: sources });
      setLoading(false);
      setIsMoreUpload(false);

      FetchProduct();

      toast.success('Fuentes agregadas para este producto');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const removeCategoryProduct = async (id_product_category: number) => {
    setLoading(true);

    try {
      await DeleteProductCategory({ token, id_product_category });

      toast.success('Se elimino la categoria de este producto');
      setLoading(false);

      FetchProduct();
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Page className={classes.root} title={`Detalles: ${Product?.title}`}>
      <Container maxWidth='xl'>
        <Card className={classes.root}>
          <CardActionArea>
            {Loading ? (
              <Skeleton variant='rect' width='100%' height={218} />
            ) : (
              <CardMedia
                className={classes.media}
                image={`${BASE_API_IMAGES_CLOUDINNARY}/${Product?.source}`}
                title='Contemplative Reptile'
              />
            )}
            <CardContent>
              <Grid container spacing={3} direction='row' justify='flex-end'>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item>
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => setVisibleAddCategory(true)}
                  >
                    Añadir categoria
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.btnEdit}>Editar</Button>
                </Grid>
                <Grid item>
                  <Button className={classes.btnDelete} onClick={() => setVisibleDialog(true)}>
                    Eliminar
                  </Button>
                </Grid>
              </Grid>

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
                    <Rating name='read-only' value={Product?.stars} readOnly />
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
                  Actualizado el:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.updated_at}</strong>
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
                  Termina desct:{' '}
                  {Loading ? (
                    <Skeleton variant='text' width={85} />
                  ) : (
                    <strong>{Product?.offer_expires_date || 'Sin fecha'}</strong>
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

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  Categorias:{' '}
                  {Loading ? (
                    <>
                      <Skeleton variant='text' width={85} />
                      <Skeleton variant='text' width={85} />
                      <Skeleton variant='text' width={85} />
                    </>
                  ) : (
                    <ul>
                      {Product?.categorys?.map(cate => (
                        <>
                          <li key={cate.id_product_category} style={{ marginTop: 10 }}>
                            <span
                              className={classes.TextDelete}
                              onClick={() => removeCategoryProduct(cate.id_product_category)}
                            >
                              Eliminar
                            </span>{' '}
                            <strong>{cate.titleCategory}</strong>
                          </li>
                        </>
                      ))}
                    </ul>
                  )}
                </Grid>

                <Grid item xs={12}>
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
                      <Button
                        color='primary'
                        variant='contained'
                        onClick={() => setIsMoreUpload(!IsMoreUpload)}
                      >
                        {IsMoreUpload ? 'Cancelar subir fuentes' : 'Subir mas fuentes'}
                      </Button>
                      <br />
                      <br />
                      {IsMoreUpload ? (
                        <>
                          <UploadImage images={images} maxNumber={4} onChange={onChange} />
                          <br />
                          {images.length > 0 && (
                            <Button variant='contained' color='primary' onClick={uploadSources}>
                              Subir fuentes
                            </Button>
                          )}
                        </>
                      ) : (
                        <>
                          <strong>Imagenes Relacionadas:</strong>{' '}
                          {Product && <ListImagen sources={Product.related_sources} />}
                        </>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} md={6}>
                  <Recibidos Received={StatiscProduct?.Received} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Recomendado Recommendation={StatiscProduct?.Recommendation} />
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

      <DialogoForm
        title='Elige las categoria que pertenece este producto'
        Open={visibleAddCategory}
        setOpen={setVisibleAddCategory}
      >
        <AddCategory idProduct={params.idProduct} setReloadProduct={setReloadProduct} />
      </DialogoForm>

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
      />
    </Page>
  );
};
