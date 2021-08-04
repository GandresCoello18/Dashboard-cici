/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, SetStateAction, useContext } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, Card, CardContent, Divider, Grid, TextField } from '@material-ui/core';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import Alert from '@material-ui/lab/Alert';
import { NewLottery, UpdateFinishLottery } from '../../api/lottery';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

interface Props {
  setReloadSorteo: Dispatch<SetStateAction<boolean>>;
  isCart: number;
  idLoterry?: string;
}

export const InputFormLottery = ({ setReloadSorteo, isCart, idLoterry }: Props) => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        finishAt: '',
      }}
      validationSchema={Yup.object().shape({
        finishAt: Yup.string().required('Esta opcion es requerida').max(50),
      })}
      onSubmit={async (values, actions) => {
        const { finishAt } = values;

        if (new Date(finishAt).getTime() < new Date().getTime()) {
          toast.warn('La fecha de finalizacion tiene que ser mayor a la actual');
          return;
        }

        try {
          if (!idLoterry) {
            await NewLottery({ token, finishAt });
            toast.success('Se creo el nuevo sorteo');
          } else {
            await UpdateFinishLottery({ token, finishAt, idLoterry });
            toast.success('Se actualizo el sorteo');
          }

          setReloadSorteo(true);
          actions.setSubmitting(false);
        } catch (error) {
          toast.error(HandleError(error as AxiosError));
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <p>
                    {!idLoterry ? '¿Cuando empieza el sorteo?' : 'Actualizar finish del sorteo'}
                  </p>
                  <br />
                  <TextField
                    error={Boolean(touched.finishAt && errors.finishAt)}
                    helperText={touched.finishAt && errors.finishAt}
                    fullWidth
                    type='datetime-local'
                    name='finishAt'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display='flex' justifyContent='flex-end' p={2}>
              <Button
                color='primary'
                disabled={isSubmitting || (isCart === 0 ? true : false && !idLoterry)}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
              >
                Registrar
              </Button>
            </Box>

            {isCart === 0 && !idLoterry && (
              <Alert severity='info'>
                No hay productos en el <strong>Carrito de compras</strong> para mostrar.
              </Alert>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};
