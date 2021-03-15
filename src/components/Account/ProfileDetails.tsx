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

export const ProfileDetails = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          userName: '',
          Phone: 0,
          Cedula: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(100)
            .required('El email es requerido'),
          userName: Yup.string().max(100).required('El nombre de usuario es requerido'),
          Phone: Yup.string().max(10).required('El telefono del usuario es requerido'),
          Cedula: Yup.string().max(10).required('La cedula del usuario es requerido'),
        })}
        onSubmit={(values, actions) => {
          console.log(values);
          try {
            // await UpdateMeUser(token, values);
          } catch (error) {
            console.log(error.message);
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
                      required
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder={'User Name'}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField fullWidth disabled value='' variant='outlined' />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      fullWidth
                      name='email'
                      required
                      onBlur={handleBlur}
                      variant='outlined'
                      onChange={handleChange}
                      placeholder={'Email'}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.Phone && errors.Phone)}
                      helperText={touched.Phone && errors.Phone}
                      fullWidth
                      name='Phone'
                      onBlur={handleBlur}
                      type='number'
                      onChange={handleChange}
                      variant='outlined'
                      placeholder={'Phone'}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      error={Boolean(touched.Cedula && errors.Cedula)}
                      helperText={touched.Cedula && errors.Cedula}
                      fullWidth
                      name='Cedula'
                      onBlur={handleBlur}
                      type='number'
                      onChange={handleChange}
                      variant='outlined'
                      placeholder={'Numero de identificacion'}
                    />
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
