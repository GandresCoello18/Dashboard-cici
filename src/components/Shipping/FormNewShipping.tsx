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
  FormControl,
  Divider,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';
import { CreateShipping } from '../../api/shipping';
import { toast } from 'react-toast';
import { BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../api';

interface Props {
  idOrder: string | undefined;
  setReloadOrders: Dispatch<SetStateAction<boolean>>;
}

export const FormNewShipping = ({ idOrder, setReloadOrders }: Props) => {
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        idOrder: '',
        guide: '',
        method: '',
      }}
      validationSchema={Yup.object().shape({
        guide: Yup.string().max(100),
        method: Yup.string().max(100),
      })}
      onSubmit={async (values, actions) => {
        setLoading(true);

        if (idOrder) {
          values.idOrder = idOrder;
        }

        try {
          await CreateShipping({ token, data: values });
          toast.success('Se registro el envio de la orden: 100');
          setReloadOrders(true);

          setLoading(false);
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
            <CardHeader subheader='Quien y como se envia el producto' title='Envios' />
            <Divider />
            <CardContent>
              <Box display='flex' justifyContent='center' style={{ padding: 10 }}>
                <img
                  src={`${BASE_API_IMAGES_CLOUDINNARY_SCALE}/coupons/shipping_fjggsu.svg`}
                  alt='envio'
                  width='70%'
                />
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl style={{ width: 200, marginBottom: 10 }}>
                    <InputLabel id='demo-simple-select-label'>Empresa de envios</InputLabel>
                    <Select
                      error={Boolean(touched.method && errors.method)}
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='method'
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value='ServiEntrega'>ServiEntrega</MenuItem>
                      <MenuItem value='Cici'>Cici</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(touched.guide && errors.guide)}
                    helperText={touched.guide && errors.guide}
                    fullWidth
                    label='Guia de rastreo'
                    name='guide'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant='outlined'
                    placeholder={'Escriba el numero de guia'}
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
                {Loading ? 'Cargando...' : 'Registrar Envio'}
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
