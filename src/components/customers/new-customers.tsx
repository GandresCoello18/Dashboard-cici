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
import { NewUser } from '../../api/users';
import { toast } from 'react-toast';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setReloadCustoment: Dispatch<SetStateAction<boolean>>;
}

export const NewCustoment = ({ setReloadCustoment }: Props) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          userName: '',
          password: '',
          phone: '',
          provider: 'cici',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Esta direccion es invalida').max(100),
          userName: Yup.string().max(100),
          password: Yup.string().max(100),
          phone: Yup.string().max(10),
        })}
        onSubmit={async (values, actions) => {
          if (values.password.length >= 7) {
            try {
              await NewUser({ data: values });
              toast.success('Se creo el nuevo usuario');
              setReloadCustoment(true);
            } catch (error) {
              toast.error(error.message);
            }

            actions.setSubmitting(false);
          } else {
            toast.error('Se necesita 7 o mas caracteres para la clave.');
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
                      error={Boolean(touched.userName && errors.userName)}
                      helperText={touched.userName && errors.userName}
                      fullWidth
                      name='userName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant='outlined'
                      placeholder={'Nombre de usuario'}
                    />
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
                      placeholder={'Direccion de correo'}
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
                      placeholder={'Escriba una clave con 7 o mas digitos'}
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
                      placeholder={'Escriba numero telefonico'}
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
