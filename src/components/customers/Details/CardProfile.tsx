/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { makeStyles, CardContent, Card, Avatar, Grid, Box, Typography } from '@material-ui/core';

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

export const CardProfile = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
          <Grid item xs={12} sm={4} className={classes.divide}>
            <Avatar
              alt='Remy Sharp'
              src='https://material-ui.com/static/images/avatar/1.jpg'
              className={classes.large}
            />
            <h3>Carlos Jose</h3>
            <br />
            <Box justifyContent='center' display='flex'>
              <Box mr={1}>
                <strong>Admin</strong>
                <Typography>User</Typography>
              </Box>

              <Box ml={1}>
                <strong>Cici</strong>
                <Typography>Provider</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Grid container spacing={4} direction='row' justify='center' alignItems='center'>
              <Grid item xs={12} md={6}>
                Email: <strong>goyeselcoca@gmail.com</strong>
              </Grid>
              <Grid item xs={12} md={6}>
                Usuario: <strong>Carlos jose</strong>
              </Grid>
              <Grid item xs={12} md={6}>
                Telefono: <strong>0992239138</strong>
              </Grid>
              <Grid item xs={12} md={6}>
                Creado: <strong>2020/08/05</strong>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
