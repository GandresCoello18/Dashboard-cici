/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { useContext } from 'react';
import { MeContext } from '../../context/contextMe';
import { UpdatePasswordUser } from '../../api/users';
import { toast } from 'react-toast';
import Cookies from 'js-cookie';

export const ResetPassword = () => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        currentKey: '',
        newKey: '',
      }}
      validationSchema={Yup.object().shape({
        currentKey: Yup.string().required('Este campo es requerido').max(50),
        newKey: Yup.string().required('Este campo es requerido').max(50),
      })}
      onSubmit={async (values, actions) => {
        try {
          await UpdatePasswordUser({ token, currentKey: values.currentKey, newKey: values.newKey });
          toast.success('Se actualizaron los datos');

          Cookies.remove('access-token-cici');
          window.location.href = '/login';
        } catch (error) {
          toast.error(error.message);
        }

        actions.setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader subheader='Digita tu clave actual y la nueva.' title='Cambiar contraseña' />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label='Password'
                error={Boolean(touched.currentKey && errors.currentKey)}
                helperText={touched.currentKey && errors.currentKey}
                margin='normal'
                name='currentKey'
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
                variant='outlined'
              />
              <TextField
                fullWidth
                error={Boolean(touched.newKey && errors.newKey)}
                helperText={touched.newKey && errors.newKey}
                label='Confirmar password'
                margin='normal'
                name='newKey'
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
                variant='outlined'
              />
            </CardContent>
            <Divider />
            <Box display='flex' justifyContent='flex-end' p={2}>
              <Button color='secondary' type='submit' disabled={isSubmitting} variant='contained'>
                Actualizar contraseña
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
