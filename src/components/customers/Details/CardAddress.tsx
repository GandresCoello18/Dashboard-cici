/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const CardAddress = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' style={{ color: 'red' }}>
          Eliminar
        </Button>
        <Button size='small' color='secondary'>
          En uso
        </Button>
      </CardActions>
    </Card>
  );
};
