/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useContext } from 'react';
import { MeContext } from '../../../context/contextMe';
import { UpdateCustomer } from '../../../api/users';
import { toast } from 'react-toast';
import { Customers } from '../../../interfaces/Customers';

interface Props {
  User: Customers;
  setReloadUser: Dispatch<SetStateAction<boolean>>;
}

export const EditCustomer = ({ User, setReloadUser }: Props) => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        email: User.email,
        userName: User.userName,
        phone: User.phone,
        isBanner: User.isBanner,
        isAdmin: User.isAdmin,
        validatedEmail: User.validatedEmail,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Este campo es requerido').max(50),
        userName: Yup.string().required('Este campo es requerido').max(50),
        phone: Yup.string().max(50),
        isBanner: Yup.boolean(),
        isAdmin: Yup.boolean(),
        validatedEmail: Yup.boolean(),
      })}
      onSubmit={async (values, actions) => {
        try {
          await UpdateCustomer({ token, data: values });
          toast.success('Se actualizaron los datos');
          setReloadUser(true);
        } catch (error) {
          toast.error(error.message);
        }

        actions.setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title='Actualizar usuario' />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                label='User name'
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
                margin='normal'
                name='userName'
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.userName}
                variant='outlined'
              />
              <TextField
                fullWidth
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                label='Dirección de correo'
                margin='normal'
                name='email'
                type='email'
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.email}
                variant='outlined'
              />
              <TextField
                fullWidth
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                label='Telefono'
                margin='normal'
                name='phone'
                type='number'
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.phone}
                variant='outlined'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isAdmin ? true : false}
                    onChange={handleChange}
                    name='isAdmin'
                  />
                }
                label='Administrador'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isBanner ? true : false}
                    onChange={handleChange}
                    name='isBanner'
                  />
                }
                label='Baneado'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.validatedEmail ? true : false}
                    onChange={handleChange}
                    name='validatedEmail'
                  />
                }
                label='Email validado'
              />
            </CardContent>
            <Divider />
            <Box display='flex' justifyContent='flex-end' p={2}>
              <Button color='secondary' type='submit' disabled={isSubmitting} variant='contained'>
                Actualizar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
