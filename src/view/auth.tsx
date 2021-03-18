/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Container, Box, makeStyles } from '@material-ui/core';
import Page from '../components/page';
import PinField from 'react-pin-field';
import { useState } from 'react';
import { Login } from '../components/Auth/formLogin';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  center: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 100,
  },
  field: {
    border: '1px solid #d3d3d3',
    borderRight: 'none',
    fontSize: '2rem',
    height: '4rem',
    outline: 'none',
    textAlign: 'center',
    transitionDuration: '.25s',
    width: '4rem',
    padding: 10,
    borderColor: '#fec4d2',
    color: '#fec4d2',
  },
}));

export const Auth = () => {
  const classes = useStyles();
  const [ValidateCode, setValidateCode] = useState<boolean>(false);

  return (
    <Page className={classes.root} title='Access'>
      <Container maxWidth='md'>
        <Box className={classes.center}>
          <Box justifyContent='center'>
            <Box style={{ textAlign: 'center' }}>
              <img src='logo-cici.jpg' alt='Logo cici' className={classes.logo} width={200} />
              <br />
              {ValidateCode ? (
                <Login />
              ) : (
                <>
                  <PinField
                    className={classes.field}
                    length={5}
                    onComplete={event =>
                      event === '0992G' ? setValidateCode(true) : alert('Codigo invalido')
                    }
                  />
                  <br />
                  <h3 style={{ padding: 10 }}>Access Code</h3>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};
