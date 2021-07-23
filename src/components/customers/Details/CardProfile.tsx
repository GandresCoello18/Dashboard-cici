/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { makeStyles, CardContent, Card, Avatar, Grid, Box, Typography } from '@material-ui/core';
import { Customers } from '../../../interfaces/Customers';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: any) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: 'auto',
  },
  content: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
  },
  divide: {
    borderRight: `1px solid ${theme.palette.text.secondary}`,
  },
}));

interface Props {
  User: Customers | undefined;
  Loading: boolean;
}

export const CardProfile = ({ User, Loading }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
          <Grid item xs={12} sm={4} className={classes.divide}>
            {Loading ? (
              <Skeleton variant='circle' width={40} height={40} />
            ) : (
              <Avatar alt='Remy Sharp' src={User?.avatar} className={classes.large} />
            )}
            {Loading ? <Skeleton variant='text' width={40} /> : <h3>{User?.userName}</h3>}
            <br />
            <Box justifyContent='center' display='flex'>
              <Box mr={1}>
                {Loading ? (
                  <Skeleton variant='text' width={60} />
                ) : (
                  <strong>{User?.isAdmin ? 'Admin' : 'Client'}</strong>
                )}
                <Typography>User</Typography>
              </Box>

              <Box ml={1}>
                {Loading ? (
                  <Skeleton variant='text' width={60} />
                ) : (
                  <strong>{User?.provider}</strong>
                )}
                <Typography>Provider</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={3} direction='row'>
              <Grid item xs={12} md={6}>
                Email:{' '}
                {Loading ? <Skeleton variant='text' width={160} /> : <strong>{User?.email}</strong>}
              </Grid>
              <Grid item xs={12} md={6}>
                Baneado:{' '}
                {Loading ? (
                  <Skeleton variant='text' width={60} />
                ) : (
                  <strong>{User?.isBanner ? 'Si' : 'No'}</strong>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                CiciRank:{' '}
                {Loading ? (
                  <Skeleton variant='text' width={60} />
                ) : (
                  <strong>{User?.ciciRank}</strong>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                Email validado:{' '}
                {Loading ? (
                  <Skeleton variant='text' width={160} />
                ) : (
                  <strong>{User?.validatedEmail ? 'Si' : 'No'}</strong>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                Telefono:{' '}
                {Loading ? (
                  <Skeleton variant='text' width={60} />
                ) : (
                  <strong>{User?.phone || 'Ninguno'}</strong>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                Creado:{' '}
                {Loading ? (
                  <Skeleton variant='text' width={160} />
                ) : (
                  <strong>{User?.created_at}</strong>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
