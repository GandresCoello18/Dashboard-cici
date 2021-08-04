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
  Grid,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toast';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';
import { OfferTime } from '../../interfaces/TimeOffer';
import { EditTimeOffer } from '../../api/timeOffer';
import { AxiosError } from 'axios';
import { HandleError } from '../../helpers/handleError';

interface Props {
  Time: OfferTime;
  setReloadTime: Dispatch<SetStateAction<boolean>>;
}

export const FormUpdateCTime = ({ Time, setReloadTime }: Props) => {
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        finishAt: '',
        description: '',
      }}
      validationSchema={Yup.object().shape({
        finishAt: Yup.string().max(25),
        description: Yup.string().max(100),
      })}
      onSubmit={async (values, actions) => {
        setLoading(true);
        const { finishAt, description } = values;

        const update = {
          ...Time,
          finishAt: '',
        };

        if (finishAt) {
          update.finishAt = finishAt;
        }

        if (description) {
          update.description = description;
        }

        try {
          await EditTimeOffer({ token, update });

          setReloadTime(true);
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
                    error={Boolean(touched.finishAt && errors.finishAt)}
                    helperText={touched.finishAt && errors.finishAt}
                    fullWidth
                    name='finishAt'
                    type='date'
                    onBlur={handleBlur}
                    variant='outlined'
                    defaultValue={Time.finish_at}
                    onChange={handleChange}
                    placeholder={'Nombre del combo'}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    name='description'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant='outlined'
                    defaultValue={Time.description}
                    placeholder={'descripcion'}
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
