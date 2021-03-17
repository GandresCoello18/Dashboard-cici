/* eslint-disable react/prop-types */
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
import { Addresses } from '../../../interfaces/Address';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  Address: Addresses;
}

export const CardAddress = ({ Address }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {Address.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {Address.address}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <br />
            Cuidad: <strong>{Address.city}</strong>
            <br />
            Telefono: <strong>{Address.phone}</strong>
            <br />
            Codigo Postal: <strong>{Address.postalCode}</strong>
            <br />
            Creado el: <strong>{Address.created_at}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' style={{ color: 'red' }}>
          Eliminar
        </Button>
        <Button size='small' color='secondary'>
          {Address.selected ? 'En uso' : 'Elegir como predeterminado'}
        </Button>
      </CardActions>
    </Card>
  );
};
