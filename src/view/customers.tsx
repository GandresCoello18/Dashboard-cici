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
  CardContent,
  Card,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { TableCustomer } from '../components/customers/table-customers';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { Customers } from '../interfaces/Customers';
import { toast } from 'react-toast';
import { GetUsers } from '../api/users';
import { MeContext } from '../context/contextMe';
import { DialogoForm } from '../components/DialogoForm';
import { NewCustoment } from '../components/customers/new-customers';
import { AxiosError } from 'axios';
import { HandleError } from '../helpers/handleError';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const Customenrs = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [Count, setCount] = useState<number>(0);
  const [ReloadCustoment, setReloadCustoment] = useState<boolean>(false);
  const [SearchClient, setSearchClient] = useState<string>('');
  const [FetchCustomenrs, setFetchCustomenrs] = useState<Customers[]>([]);

  const Fetch = async (page: number) => {
    setLoading(true);

    try {
      const { users, pages } = await (
        await GetUsers({ token, findUser: SearchClient || undefined, page })
      ).data;

      setFetchCustomenrs(users);
      setCount(pages || 1);

      setLoading(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch(1);

    if (ReloadCustoment) {
      setReloadCustoment(false);
      setVisible(false);
    }
  }, [token, SearchClient, ReloadCustoment]);

  const SelectItemPagination = (page: number) => Fetch(page);

  return (
    <Page className={classes.root} title='Clientes'>
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo cliente
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  fullWidth
                  onChange={event => setSearchClient(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar cliente'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <TableCustomer
            customers={FetchCustomenrs}
            Loading={Loading}
            setReloadCustoment={setReloadCustoment}
          />
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination
            count={Count}
            color='secondary'
            onChange={(event, page) => SelectItemPagination(page)}
          />
        </Box>
      </Container>

      <DialogoForm Open={visible} setOpen={setVisible} title=''>
        <NewCustoment setReloadCustoment={setReloadCustoment} />
      </DialogoForm>
    </Page>
  );
};
