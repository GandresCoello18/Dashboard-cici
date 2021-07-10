/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Product } from '../../interfaces/Product';
import { BASE_API_IMAGES_CLOUDINNARY } from '../../api';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface Props {
  product: Product;
}

export const CardProduct = ({ product }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${BASE_API_IMAGES_CLOUDINNARY}/${product.source}`}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {product.title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='secondary'>
          Ver
        </Button>
        <Button size='small' color='primary'>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};
