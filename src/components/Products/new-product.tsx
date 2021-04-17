/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  NativeSelect,
  FormControl,
  withStyles,
  InputBase,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';
import { toast } from 'react-toast';
import { UploadImage } from '../UploadImage';
import { ImageListType } from 'react-images-uploading';
import Alert from '@material-ui/lab/Alert';
import { NewProducto } from '../../api/products';
import { Colors } from '../../interfaces/Product';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReloadPrducts: Dispatch<SetStateAction<boolean>>;
}

export const NewProduct = ({ setOpen, setReloadPrducts }: Props) => {
  const [images, setImages] = useState<ImageListType>([]);
  const [colors, setColors] = useState<Colors[]>([]);
  const [SelectColor, setSelectColor] = useState<string>('');
  const [Status, setStatus] = useState<string>('Disponible');
  const { token } = useContext(MeContext);

  const onChange = (imageList: ImageListType) => setImages(imageList as never[]);

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          price: '',
          status: '',
          description: '',
          available: '',
          brand: '',
          size: '',
          model: '',
          discount: '',
          source: '',
          offer_expires_date: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Este campo es requerido').max(100),
          price: Yup.string().required('Este campo es requerido').max(3),
          description: Yup.string().required('Este campo es requerido').max(100),
          available: Yup.string().required('Este campo es requerido').max(3),
          brand: Yup.string().max(50),
          size: Yup.string().required('Este campo es requerido').max(50),
          model: Yup.string().max(50),
          discount: Yup.string().max(3),
          source: Yup.array(),
          offer_expires_date: Yup.string(),
        })}
        onSubmit={async (values, actions) => {
          if (images.length === 0) {
            toast.error('Sube una imagen de portada');
            return false;
          }

          const {
            title,
            price,
            size,
            description,
            available,
            brand,
            model,
            discount,
            offer_expires_date,
          } = values;

          const form: FormData = new FormData();

          form.append('title', title);
          form.append('price', price);
          form.append('description', description);
          form.append('available', available);
          form.append('brand', brand);
          form.append('size', size);
          form.append('model', model);
          form.append('discount', discount);
          form.append('status', Status);
          form.append('source', images[0].file || '');
          form.append('colors', JSON.stringify(colors) || '');
          form.append('offer_expires_date', offer_expires_date);

          try {
            await NewProducto({ token, data: form });
            toast.success(`Se creo el producto: ${values.title}`);

            setOpen(false);
            setReloadPrducts(true);
          } catch (error) {
            toast.error(error.message);
          }

          actions.setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Especifica las caracteristicas del producto'
                title='Crear producto'
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                      fullWidth
                      label='Titulo'
                      name='title'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder='Titulo principal'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                      fullWidth
                      name='price'
                      label='Precio'
                      onBlur={handleBlur}
                      variant='outlined'
                      onChange={handleChange}
                      placeholder='Precio'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      fullWidth
                      label='Descripcion'
                      name='description'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant='outlined'
                      placeholder='Detalles a notar del producto'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <FormControl>
                      <NativeSelect
                        id='demo-customized-select-native'
                        onChange={event => setStatus(event.target.value)}
                        name='status'
                        input={<BootstrapInput />}
                      >
                        <option value='Disponible'>Disponible</option>
                        <option value='Agotado'>Agotado</option>
                        <option value='No disponible'>No disponible</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.available && errors.available)}
                      helperText={touched.available && errors.available}
                      fullWidth
                      label='Disponibles'
                      name='available'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      type='number'
                      placeholder='Cuantos disponibles'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.brand && errors.brand)}
                      helperText={touched.brand && errors.brand}
                      fullWidth
                      label='Marca'
                      name='brand'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder='Si no contiene marca, se cataloga como normal'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.size && errors.size)}
                      helperText={touched.size && errors.size}
                      fullWidth
                      label='Tamaño'
                      name='size'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder='Cuanto mide el producto ya sea en Cm, Ml, Mt'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.model && errors.model)}
                      helperText={touched.model && errors.model}
                      fullWidth
                      label='Modelo'
                      name='model'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder='Si no contiene algun modelo, se cataloga como normal'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.discount && errors.discount)}
                      helperText={touched.discount && errors.discount}
                      fullWidth
                      label='Descuento'
                      name='discount'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      type='number'
                      placeholder='Ejemplo: 10 = 10% de descuento'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.offer_expires_date && errors.offer_expires_date)}
                      helperText={touched.offer_expires_date && errors.offer_expires_date}
                      fullWidth
                      label='Descuento disponible hasta'
                      name='offer_expires_date'
                      onChange={handleChange}
                      disabled={!values.discount}
                      onBlur={handleBlur}
                      variant='outlined'
                      type='date'
                    />
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <input type='color' onChange={event => setSelectColor(event.target.value)} />
                    <Button
                      color='secondary'
                      type='button'
                      onClick={() =>
                        setColors([
                          ...colors,
                          {
                            hex: SelectColor,
                            disabled: false,
                          },
                        ])
                      }
                    >
                      Elegir color
                    </Button>

                    {colors.map(color => (
                      <Alert key={color.hex} style={{ background: color.hex }}>
                        {color.hex}
                      </Alert>
                    ))}
                  </Grid>
                  <Grid item md={4} lg={3} sm={6} xs={12}>
                    <UploadImage images={images} maxNumber={1} onChange={onChange} />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display='flex' justifyContent='flex-end' p={2}>
                <Button
                  color='secondary'
                  disabled={isSubmitting}
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Crear Producto
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};
