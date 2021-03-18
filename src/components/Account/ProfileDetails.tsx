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

export const ProfileDetails = () => {
  const { me, token } = useContext(MeContext);

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          userName: '',
          phone: 0,
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
            toast.error(error.message);
          }

          actions.setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
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
                      name='userName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder={me.userName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField fullWidth disabled value={me.created_at} variant='outlined' />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                      name='email'
                      onBlur={handleBlur}
                      variant='outlined'
                      onChange={handleChange}
                      placeholder={me.email}
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
                      onChange={handleChange}
                      variant='outlined'
                      placeholder={me.phone ? `${me.phone}` : 'Escriba su numero de telefono'}
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
