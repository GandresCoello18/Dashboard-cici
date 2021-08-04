/* eslint-disable react/react-in-jsx-scope */
import { Grid, Avatar, CardHeader, Card, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useState } from 'react';
import { toast } from 'react-toast';
import { GetProductReview } from '../../../api/products';
import Alert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';
import { ProductReview } from '../../../interfaces/Product';
import { AxiosError } from 'axios';
import { HandleError } from '../../../helpers/handleError';

interface Props {
  idProduct: string;
}

export const Resenas = ({ idProduct }: Props) => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [Review, setReview] = useState<ProductReview[]>([]);

  useEffect(() => {
    setLoading(true);

    try {
      const FetchResena = async () => {
        const { reviews } = await (await GetProductReview({ token: undefined, idProduct })).data;
        setReview(reviews);
      };

      idProduct && FetchResena();
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
    }

    setLoading(false);
  }, [idProduct]);

  const SkeletonResenas = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7].map(item => (
      <Skeleton key={item} style={{ marginBottom: 10 }} variant='rect' width='100%' height={40} />
    ));
  };

  return (
    <>
      {Loading ? (
        SkeletonResenas()
      ) : (
        <Grid container spacing={3} direction='row'>
          {Review.map(review => (
            <Grid item xs={12} key={review.idProductReviews}>
              <Card>
                <CardHeader
                  avatar={<Avatar aria-label='recipe' alt={review.userName} src={review.avatar} />}
                  title={review.userName}
                  subheader={review.created_at}
                />
                <CardContent>
                  {review.commentary}
                  <Rating name='read-only' value={review.stars} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!Loading && Review.length === 0 && (
        <Alert severity='info'>
          Por el momento no hay <strong>Reseñas</strong> para este producto.
        </Alert>
      )}
    </>
  );
};
