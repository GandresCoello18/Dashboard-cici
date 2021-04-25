/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  SvgIcon,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { MeContext } from '../context/contextMe';
import { Contact } from '../interfaces/Contacto';
import { GetContact } from '../api/contact';
import { CardContact } from '../components/Contact/card-contact';
import { Skeleton } from '@material-ui/lab';

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

export const PageContacts = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [ReloadContact, setReloadContact] = useState<boolean>(false);
  const [SearchCoupon, setSearchCoupon] = useState<string>('');
  const [Contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setLoading(true);

    const Fetch = async () => {
      try {
        const { contact } = await (await GetContact({ token })).data;
        setContacts(contact);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    Fetch();

    if (ReloadContact) {
      setReloadContact(false);
    }
  }, [token, SearchCoupon, ReloadContact]);

  const SkeletonCardContact = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  return (
    <Page className={classes.root} title='Cupones'>
      {console.log(Contacts)}
      <Container maxWidth={undefined}>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500} display='flex'>
                <TextField
                  fullWidth
                  onChange={event => setSearchCoupon(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar por nombre o correo'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          {Contacts.map(item => (
            <CardContact key={item.idContact} Contact={item} />
          ))}

          {Loading && SkeletonCardContact()}
        </Box>
      </Container>
    </Page>
  );
};
