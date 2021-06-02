/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import Page from '../components/page';
import { toast } from 'react-toast';
import { MeContext } from '../context/contextMe';
import Skeleton from '@material-ui/lab/Skeleton';
import { GetCombos } from '../api/combo';
import { DialogoForm } from '../components/DialogoForm';
import { TableProductCombo } from '../components/Combos/table-product-combo';
import { ProductsCombo } from '../interfaces/Combo';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { NewFormCombo } from '../components/Combos/new-combo';

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
  cardCombo: {
    maxWidth: 345,
    marginBottom: 10,
  },
  btnDelete: {
    backgroundColor: 'pink',
    marginLeft: 10,
  },
  btnEdit: {
    backgroundColor: 'orange',
    marginLeft: 10,
  },
  btnAdd: {
    backgroundColor: '#6dd96d',
  },
}));

export const Combos = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [ReloadCombo, setReloadCombo] = useState<boolean>(false);
  const [FetchCombos, setFetchCombos] = useState<ProductsCombo[]>([]);

  const Fetch = async () => {
    setLoading(true);

    try {
      const { combos } = await (await GetCombos({ token })).data;
      setFetchCombos(combos);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch();

    if (ReloadCombo) {
      setReloadCombo(false);
    }
  }, [token, ReloadCombo]);

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
              <Box key={combo.idCombo}>
                <Card className={classes.cardCombo}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        ** <strong>Lizard</strong> **
                      </Typography>
                      <Typography gutterBottom>
                        Precio: <strong>${combo.price}</strong>
                        <br />
                        Activo: <strong>{combo.active ? 'Si' : 'No'}</strong>
                        <br />
                        Vendidos: <strong>{combo.sold}</strong>
                        <br />
                        Creado el: <strong>{combo.created_at}</strong>
                      </Typography>
                      <hr />
                      <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button type='button' className={classes.btnAdd}>
                          <AddIcon />
                        </Button>
                        <Button type='button' className={classes.btnEdit}>
                          <EditIcon />
                        </Button>
                        <Button type='button' className={classes.btnDelete}>
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <TableProductCombo products={combo.products} />
              </Box>
            ))}
        </Box>
      </Container>

      <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo Combo'>
        <NewFormCombo setReloadCombo={setReloadCombo} />
      </DialogoForm>
    </Page>
  );
};
