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
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { NewCoupon } from '../../api/coupons';
import { toast } from 'react-toast';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { UploadImage } from '../UploadImage';
import { ImageListType } from 'react-images-uploading';
import { MeContext } from '../../context/contextMe';

interface Props {
  setReloadCoupon: Dispatch<SetStateAction<boolean>>;
}

export const NewCoupons = ({ setReloadCoupon }: Props) => {
  const [images, setImages] = useState<ImageListType>([]);
  const { token } = useContext(MeContext);

  const onChange = (imageList: ImageListType) => setImages(imageList as never[]);

  return (
    <>
      <Formik
        initialValues={{
          type: '',
          descripcion: '',
        }}
        validationSchema={Yup.object().shape({
          type: Yup.string().required('Esta opcion es requerida').max(100),
          descripcion: Yup.string().required('Esta opcion es requerida').max(100),
        })}
        onSubmit={async (values, actions) => {
          const { type, descripcion } = values;

          if (images.length === 0) {
            toast.error('Selecciona una imagen para el cupon');
            return false;
          }

          const form = new FormData();

          form.append('type', type);
          form.append('descripcion', descripcion);
          form.append('source', images[0].file || '');

          try {
            await NewCoupon({ token, data: form });
            toast.success('Se creo el nuevo cupon');

            setReloadCoupon(true);
            actions.setSubmitting(false);
          } catch (error) {
            toast.error(error.message);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader title='Crear nuevo usuario' />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.type && errors.type)}
                      helperText={touched.type && errors.type}
                      fullWidth
                      name='type'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder={'Nombre del cupon'}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.descripcion && errors.descripcion)}
                      helperText={touched.descripcion && errors.descripcion}
                      fullWidth
                      name='descripcion'
                      onBlur={handleBlur}
                      variant='outlined'
                      onChange={handleChange}
                      placeholder={'Descripcion del cupon'}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <UploadImage images={images} maxNumber={1} onChange={onChange} />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display='flex' justifyContent='flex-end' p={2}>
                <Button
                  color='primary'
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Registrar
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};
