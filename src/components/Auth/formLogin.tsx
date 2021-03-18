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
  CircularProgress,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { LoginAccess } from '../../api/users';
import { toast } from 'react-toast';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';

export const Login = () => {
  const { setMe } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        provider: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(100)
          .required('El email es requerido'),
        password: Yup.string().max(100).required('El password de usuario es requerido'),
      })}
      onSubmit={async (values, actions) => {
        setLoading(true);
        console.log(values);
        values.provider = 'cici';

        try {
          const response = await (await LoginAccess({ token: undefined, data: values })).data;
          setMe(response.me.user);
          Cookies.set('access-token-cici', response.me.token);

          window.location.href = '/app/dashboard';
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }

        actions.setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader subheader='Acceso solo para administradores' title='Iniciar sesion' />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
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
                    placeholder={'Direccion de email'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                    name='password'
                    onBlur={handleBlur}
                    type='password'
                    onChange={handleChange}
                    variant='outlined'
                    placeholder={'Clave secreta'}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display='flex' justifyContent='flex-end' p={2}>
              {Loading ? (
                <CircularProgress color='secondary' />
              ) : (
                <Button
                  color='secondary'
                  disabled={isSubmitting}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Entrar
                </Button>
              )}
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
