/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import Page from '../components/page';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import { TableProductLottery } from '../components/lottey/table-lottery';
import { ProductLottery } from '../interfaces/lottery';
import { CardProduct } from '../components/Products/card-product';
import { DialogoForm } from '../components/DialogoForm';
import { NewFormLottery } from '../components/lottey/new-lottery';
import { Product } from '../interfaces/Product';
// import { MeContext } from '../context/contextMe';

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
}));

export const LoterryView = () => {
  const classes = useStyles();
  // const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchSorteo, setSearchSorteo] = useState<string>('');
  const [Sorteos, setSorteos] = useState<ProductLottery[]>([]);
  const [Cart, setCart] = useState<Product[]>([]);
  const [ReloadSorteo, setReloadSorteo] = useState<boolean>(false);
  const [selectSorteo, setSelectSorteo] = useState<ProductLottery | undefined>(undefined);

  useEffect(() => {
    console.group(visible, searchSorteo, selectSorteo, ReloadSorteo, Cart);
    setSorteos([]);
    setCart([]);
  }, [ReloadSorteo]);

  return (
    <Page className={classes.root} title='Sorteos'>
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo sorteo
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  fullWidth
                  onChange={event => setSearchSorteo(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar sorteo'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Productos en mi carrito</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} direction='row' alignItems='center'>
                {[0, 1, 2, 3, 4].map(item => (
                  <Grid item xs={12} md={4} lg={3} key={item}>
                    <CardProduct />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={3}>
          {Sorteos.map(item => (
            <TableProductLottery
              Lottery={item}
              Loading={true}
              setSelectProduct={setSelectSorteo}
              key={item.idLottery}
            />
          ))}
        </Box>

        <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo sorteo'>
          <NewFormLottery setReloadSorteo={setReloadSorteo} isCart={Cart.length} />
        </DialogoForm>
      </Container>
    </Page>
  );
};
