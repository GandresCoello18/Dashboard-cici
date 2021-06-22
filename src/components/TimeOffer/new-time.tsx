/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext } from 'react';
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
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { CreateTimeOffer } from '../../api/timeOffer';

interface Props {
  setReloadTime: Dispatch<SetStateAction<boolean>>;
}

export const NewFormTime = ({ setReloadTime }: Props) => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        finishAt: '',
        description: '',
      }}
      validationSchema={Yup.object().shape({
        finishAt: Yup.string().required('Esta opcion es requerida').max(50),
        description: Yup.string().required('Esta opcion es requerida').max(150),
      })}
      onSubmit={async (values, actions) => {
        const { finishAt, description } = values;

        if (new Date(finishAt).getTime() < new Date().getTime()) {
          toast.warn('La fecha debe ser mayor ha hoy');
          return false;
        }

        try {
          await CreateTimeOffer({
            token,
            data: {
              finishAt,
              description,
            },
          });
          toast.success('Se creo un nuevo tiempo');

          setReloadTime(true);
          actions.setSubmitting(false);
        } catch (error) {
          toast.error(error.message);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader />
            <Divider />
            <CardContent>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.finishAt && errors.finishAt)}
                  helperText={touched.finishAt && errors.finishAt}
                  fullWidth
                  name='finishAt'
                  type='date'
                  onBlur={handleBlur}
                  variant='outlined'
                  onChange={handleChange}
                  placeholder={'Cuando termina el tiempo'}
                />
              </Grid>
              <br />
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  fullWidth
                  name='description'
                  onBlur={handleBlur}
                  variant='outlined'
                  onChange={handleChange}
                  placeholder={'Descripcion de que se ocupar este tiempo'}
                />
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
                Guardar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
