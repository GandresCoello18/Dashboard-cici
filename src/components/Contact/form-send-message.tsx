/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useContext, Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toast';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  Box,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { SendMessageContact } from '../../api/contact';
import { MeContext } from '../../context/contextMe';
import { Contact } from '../../interfaces/Contacto';

interface Props {
  Contacto: Contact;
  setReloadContact: Dispatch<SetStateAction<boolean>>;
}

export const FormSendMessage = ({ Contacto, setReloadContact }: Props) => {
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={Yup.object().shape({
        message: Yup.string().max(300).required('Este campo es requerido'),
      })}
      onSubmit={async (values, actions) => {
        setLoading(true);

        const data: Contact = {
          ...Contacto,
          message: values.message,
        };

        try {
          await SendMessageContact({ token, data });
          setLoading(false);

          toast.success('Su respuesta fue enviada');
          setReloadContact(true);
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
            <CardHeader subheader='' title={`Responder a: ${Contacto.name}`} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                    fullWidth
                    name='message'
                    onBlur={handleBlur}
                    multiline
                    rows={6}
                    onChange={handleChange}
                    variant='outlined'
                    placeholder='Escribete tu respuesta aqui..!!'
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
                  Enviar respuesta
                </Button>
              )}
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
