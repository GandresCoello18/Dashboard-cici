/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toast';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';
import { UpdateCombo } from '../../api/combo';
import { NewCombo } from '../../interfaces/Combo';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

interface Props {
  Combo: NewCombo;
  setReloadCombo: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateCombo = ({ Combo, setReloadCombo }: Props) => {
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        name: '',
        price: 0,
        active: false,
        discount: 0,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(100),
        price: Yup.number().max(100),
        active: Yup.string(),
        discount: Yup.number().max(100),
      })}
      onSubmit={async (values, actions) => {
        setLoading(true);
        const { name, price, active, discount } = values;

        const combo: NewCombo = {
          ...Combo,
          sold: 0,
        };

        if (name) {
          combo.name = name;
        }

        if (price) {
          combo.price = price;
        }

        if (active) {
          combo.active = active;
        }

        if (discount) {
          combo.discount = discount;
        }

        try {
          await UpdateCombo({ token, combo });

          setReloadCombo(true);
        } catch (error) {
          toast.error(HandleError(error as AxiosError));
          setLoading(false);
        }

        actions.setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    name='name'
                    onBlur={handleBlur}
                    variant='outlined'
                    onChange={handleChange}
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
                    type='number'
                    onChange={handleChange}
                    variant='outlined'
                    placeholder={'Precio del combo'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.discount && errors.discount)}
                    helperText={touched.discount && errors.discount}
                    fullWidth
                    name='discount'
                    onBlur={handleBlur}
                    type='number'
                    onChange={handleChange}
                    variant='outlined'
                    placeholder={'Descuento del combo'}
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
                  Guardar
                </Button>
              )}
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};
