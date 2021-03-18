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
import { useContext } from 'react';
import { MeContext } from '../../context/contextMe';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const { me } = useContext(MeContext);

  return (
    <Card>
      <CardContent>
        <Box alignItems='center' display='flex' flexDirection='column'>
          <Avatar className={classes.avatar} src={me.avatar} />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            {me.userName}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {me.email}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {me.created_at}
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
