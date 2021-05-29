/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Box, Button } from '@material-ui/core';
import Page from '../components/page';
import { toast } from 'react-toast';
import { MeContext } from '../context/contextMe';
import Skeleton from '@material-ui/lab/Skeleton';
import { GetCombos } from '../api/combo';
import { DialogoForm } from '../components/DialogoForm';
import { NewCoupons } from '../components/Coupons/new-coupons';
import { TableProductCombo } from '../components/Combos/table-product-combo';
import { ProductsCombo } from '../interfaces/Combo';

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

export const Combos = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [ReloadCoupon, setReloadCoupon] = useState<boolean>(false);
  const [FetchCombos, setFetchCombos] = useState<ProductsCombo[]>([]);

  const Fetch = async () => {
    setLoading(true);

    try {
      const { combos } = await (await GetCombos({ token })).data;
      setFetchCombos(combos);

      setLoading(true);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch();

    if (ReloadCoupon) {
      setReloadCoupon(false);
    }
  }, [token, ReloadCoupon]);

  const SkeletonProduct = () => {
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
    <Page className={classes.root} title='Cupones'>
      <Container maxWidth={undefined}>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo Combo
          </Button>
        </Box>
        <Box mt={3}>
          {Loading && SkeletonProduct()}
          {!Loading &&
            FetchCombos.map(combo => (
              <TableProductCombo key={combo.idCombo} products={combo.Products} />
            ))}
        </Box>
      </Container>

      <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo Combo'>
        <NewCoupons setReloadCoupon={setReloadCoupon} />
      </DialogoForm>
    </Page>
  );
};
