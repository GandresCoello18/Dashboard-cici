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
  FormControl,
  Divider,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { NewCombo } from '../../interfaces/Combo';
import { CreateCombo } from '../../api/combo';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

interface Props {
  setReloadCombo: Dispatch<SetStateAction<boolean>>;
}

export const NewFormCombo = ({ setReloadCombo }: Props) => {
  const { token } = useContext(MeContext);

  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
        discount: 0,
        active: false,
        sold: 0,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Esta opcion es requerida').max(50),
        price: Yup.number().required('Esta opcion es requerida').max(100),
        discount: Yup.number().required('Esta opcion es requerida').max(100),
        active: Yup.string().required('Esta opcion es requerida').max(10),
        sold: Yup.number().required('Esta opcion es requerida').max(100),
      })}
      onSubmit={async (values, actions) => {
        const { name, price, discount, active, sold } = values;

        const data: NewCombo = {
          idCombo: '',
          name,
          price,
          discount,
          active,
          sold,
        };

        try {
          await CreateCombo({ token, data });
          toast.success('Se creo el nuevo combo');

          setReloadCombo(true);
          actions.setSubmitting(false);
        } catch (error) {
          toast.error(HandleError(error as AxiosError));
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant='outlined'
                    placeholder={'Nombre del combo'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                    fullWidth
                    name='price'
                    onBlur={handleBlur}
                    variant='outlined'
                    onChange={handleChange}
                    placeholder={'Precio del combo en total'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.discount && errors.discount)}
                    helperText={touched.discount && errors.discount}
                    fullWidth
                    name='discount'
                    onBlur={handleBlur}
                    variant='outlined'
                    onChange={handleChange}
                    placeholder={'Descuento en % del combo'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl style={{ width: 200, marginBottom: 10 }}>
                    <InputLabel id='demo-simple-select-label'>Estado</InputLabel>
                    <Select
                      error={Boolean(touched.active && errors.active)}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='active'
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value='true'>Activar</MenuItem>
                      <MenuItem value='false'>Desactivar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.sold && errors.sold)}
                    helperText={touched.sold && errors.sold}
                    fullWidth
                    name='sold'
                    onBlur={handleBlur}
                    variant='outlined'
                    onChange={handleChange}
                    placeholder={'Combos vendidos anteriormente'}
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
                Registrar
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
