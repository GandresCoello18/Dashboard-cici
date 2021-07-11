/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/Product';
import { toast } from 'react-toast';
import { BASE_API_IMAGES_CLOUDINNARY } from '../../api';
import { DeleteProductCart } from '../../api/cart';
import { MeContext } from '../../context/contextMe';

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
  setReloadCart: Dispatch<SetStateAction<boolean>>;
}

export const CardProduct = ({ product, setReloadCart }: Props) => {
  const classes = useStyles();
  const [Loading, setLoading] = useState<boolean>(false);
  const { token } = useContext(MeContext);

  const RemoveProduct = async () => {
    setLoading(true);

    try {
      await DeleteProductCart({ token, idProduct: product.idProducts });
      setLoading(false);

      setReloadCart(true);
    } catch (error) {
      setLoading(false);
      toast.warn(error.message);
    }
  };

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
        <Link to={`/app/products/${product.idProducts}`}>
          <Button size='small' variant='contained' color='secondary'>
            Ver
          </Button>
        </Link>
        <Button
          size='small'
          disabled={Loading}
          variant='contained'
          color='primary'
          onClick={RemoveProduct}
        >
          {Loading ? 'Removiendo...' : 'Eliminar'}
        </Button>
      </CardActions>
    </Card>
  );
};
