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
import { useContext } from 'react';
import { MeContext } from '../../context/contextMe';
import { UpdateMeUser, UpdateUser } from '../../api/users';
import { toast } from 'react-toast';
import { HandleError } from '../../helpers/handleError';
import { AxiosError } from 'axios';

export const ProfileDetails = () => {
  const { me, token } = useContext(MeContext);

  return (
    <>
      <Formik
        initialValues={{
          email: me.email,
          userName: me.userName,
          phone: me.phone,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Esta direccion es invalida').max(100),
          userName: Yup.string().max(100),
          Phone: Yup.string().max(10),
        })}
        onSubmit={async (values, actions) => {
          const data: UpdateMeUser = {
            userName: me.userName,
            email: me.email,
            phone: me.phone || 0,
          };

          if (values.userName) {
            data.userName = values.userName;
          }

          if (values.email) {
            data.email = values.email;
          }

          if (values.phone) {
            data.phone = values.phone;
          }

          try {
            await UpdateUser({ token, data });
            toast.success('Se actualizaron los datos');
          } catch (error) {
            toast.error(HandleError(error as AxiosError));
          }

          actions.setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader subheader='Esta informacion es editable' title='Perfil' />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.userName && errors.userName)}
                      helperText={touched.userName && errors.userName}
                      fullWidth
                      label='User name'
                      name='userName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      defaultValue={values.userName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label='Te uniste el'
                      disabled
                      value={me.created_at}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                      name='email'
                      label='Dirección de correo'
                      onBlur={handleBlur}
                      variant='outlined'
                      onChange={handleChange}
                      defaultValue={values.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                      fullWidth
                      name='phone'
                      onBlur={handleBlur}
                      type='number'
                      label='Telefono'
                      onChange={handleChange}
                      variant='outlined'
                      placeholder='Escriba su numero de telefono'
                      defaultValue={values.phone}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display='flex' justifyContent='flex-end' p={2}>
                <Button
                  color='secondary'
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Actualizar detalles
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};
