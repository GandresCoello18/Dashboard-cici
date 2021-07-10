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
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { TableProductLottery } from '../components/lottey/table-lottery';
import { ProductLottery } from '../interfaces/lottery';
// import { MeContext } from '../context/contextMe';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const LoterryView = () => {
  const classes = useStyles();
  // const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchSorteo, setSearchSorteo] = useState<string>('');
  const [Sorteos, setSorteos] = useState<ProductLottery[]>([]);
  const [selectSorteo, setSelectSorteo] = useState<ProductLottery | undefined>(undefined);

  useEffect(() => {
    console.group(visible, searchSorteo, selectSorteo);
    setSorteos([]);
  }, []);

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
          {Sorteos.map(item => (
            <TableProductLottery
              Lottery={item}
              Loading={true}
              setSelectProduct={setSelectSorteo}
              key={item.idLottery}
            />
          ))}
        </Box>
      </Container>
    </Page>
  );
};
