/* eslint-disable react/react-in-jsx-scope */
import { Container, Grid, makeStyles } from '@material-ui/core';
import { ResetPassword } from '../components/Account/Password';
import { Profile } from '../components/Account/Profile';
import { ProfileDetails } from '../components/Account/ProfileDetails';
import Page from '../components/page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const Account = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Mi cuenta'>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ResetPassword />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
