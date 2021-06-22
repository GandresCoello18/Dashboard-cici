/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Box, Button } from '@material-ui/core';
import Page from '../components/page';
import { toast } from 'react-toast';
import { MeContext } from '../context/contextMe';
import { Skeleton } from '@material-ui/lab';
import { GetTimesOffer } from '../api/timeOffer';
import Alert from '@material-ui/lab/Alert';
import { TableProductCombo } from '../components/Combos/table-product-combo';
import { OfferTimeProducts } from '../interfaces/TimeOffer';
import { CardTimeOffert } from '../components/TimeOffer/card-time-offer';
import { DialogoForm } from '../components/DialogoForm';
import { NewFormTime } from '../components/TimeOffer/new-time';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  space: {
    marginLeft: 10,
  },
}));

export const PageTimeOffer = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadTime, setReloadTime] = useState<boolean>(false);
  const [TimeProducts, setTimeProducts] = useState<OfferTimeProducts[]>([]);

  const Fetch = async () => {
    setLoading(true);

    try {
      const { times } = await (await GetTimesOffer({ token })).data;
      setTimeProducts(times);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch();

    if (ReloadTime) {
      setReloadTime(false);
    }
  }, [token, ReloadTime]);

  const SkeletonTimeProduct = () => {
    return [0, 1, 2].map(c => (
      <>
        <Skeleton key={c} style={{ marginBottom: 10 }} variant='rect' width='50%' height={90} />
        {[0, 1, 2, 3].map(item => (
          <Skeleton
            key={item}
            style={{ marginBottom: 10 }}
            variant='rect'
            width='100%'
            height={40}
          />
        ))}
        <br />
        <br />
        <br />
      </>
    ));
  };

  return (
    <Page className={classes.root} title='Tiempo de oferta'>
      <Container maxWidth={undefined}>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo tiempo
          </Button>
        </Box>
        <Box mt={3}>
          {!Loading &&
            TimeProducts.map(item => (
              <Box key={item.idOfferTime}>
                <CardTimeOffert time={item} setReloadTime={setReloadTime} />
                <TableProductCombo products={item.productos} setReloadCombo={setReloadTime} />
              </Box>
            ))}

          {Loading && SkeletonTimeProduct()}

          {!Loading && !TimeProducts.length && (
            <Alert severity='info'>No hay datos para mostrar.</Alert>
          )}
        </Box>
      </Container>

      <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo tiempo'>
        <NewFormTime setReloadTime={setReloadTime} />
      </DialogoForm>
    </Page>
  );
};
