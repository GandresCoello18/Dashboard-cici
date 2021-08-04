/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@material-ui/core';
import { useContext, useState } from 'react';
import { DialogoForm } from '../DialogoForm';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toast';
import { CreateCategory } from '../../api/category';
import { MeContext } from '../../context/contextMe';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

export const NewCategory = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { token } = useContext(MeContext);

  return (
    <>
      <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
        Nueva Categoria
      </Button>

      <DialogoForm title='Nueva Categoria' Open={visible} setOpen={setVisible}>
        <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Este campo es requerido').max(50),
          })}
          onSubmit={async (values, actions) => {
            try {
              await CreateCategory({
                token,
                title: values.title,
              });

              setVisible(false);
              toast.success('Se registro la categoria');
            } catch (error) {
              toast.error(HandleError(error as AxiosError));
            }

            actions.setSubmitting(false);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader subheader='' title='' />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label='Nombre de categoria'
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    margin='normal'
                    name='title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type='text'
                    variant='outlined'
                  />
                </CardContent>
                <Divider />
                <Box display='flex' justifyContent='flex-end' p={2}>
                  <Button
                    color='secondary'
                    type='submit'
                    disabled={isSubmitting}
                    variant='contained'
                  >
                    Guardar
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </DialogoForm>
    </>
  );
};
