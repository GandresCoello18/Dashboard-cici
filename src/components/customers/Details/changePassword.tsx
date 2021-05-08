/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { useContext } from 'react';
import { MeContext } from '../../../context/contextMe';
import { UpdatePasswordEmail } from '../../../api/users';
import { toast } from 'react-toast';

interface Props {
  email: string;
}

export const ResetPasswordEmail = ({ email }: Props) => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        newKey: '',
        ConfirNewKey: '',
      }}
      validationSchema={Yup.object().shape({
        ConfirNewKey: Yup.string().required('Este campo es requerido').max(50),
        newKey: Yup.string().required('Este campo es requerido').max(50),
      })}
      onSubmit={async (values, actions) => {
        try {
          await UpdatePasswordEmail({ token, newKey: values.newKey, email });
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
            <CardHeader subheader='Digita la nueva clave.' title='Cambiar contraseña' />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                error={Boolean(touched.newKey && errors.newKey)}
                helperText={touched.newKey && errors.newKey}
                label='Password'
                margin='normal'
                name='newKey'
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
                variant='outlined'
              />
              <TextField
                fullWidth
                label='Confirmar password'
                error={Boolean(touched.ConfirNewKey && errors.ConfirNewKey)}
                helperText={touched.ConfirNewKey && errors.ConfirNewKey}
                margin='normal'
                name='ConfirNewKey'
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
