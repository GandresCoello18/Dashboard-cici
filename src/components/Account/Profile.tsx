/* eslint-disable react/react-in-jsx-scope */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

export const Profile = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar className={classes.avatar} src='' />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            anonimo
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            anonimo@gmail.com
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            fecha de creacion
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color='secondary' fullWidth variant='contained'>
          Cambiar Foto
        </Button>
      </CardActions>
    </Card>
  );
};
