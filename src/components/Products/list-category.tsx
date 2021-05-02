/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  ListItemText,
  Chip,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CategoryCountProduct } from '../../interfaces/Category';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

interface Props {
  CategoryCountProduct: CategoryCountProduct[];
}

export const ListCategory = ({ CategoryCountProduct }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title='Categorias / Total productos' />
      <Divider />
      <CardContent className={classes.root}>
        {CategoryCountProduct.map(item => (
          <>
            <Box display='flex' key={item.titleCategory}>
              <ListItemText primary={item.titleCategory} />
              <Chip label={item.productos} color='secondary' />
            </Box>
            <Divider />
          </>
        ))}

        {CategoryCountProduct.length === 0 && (
          <Alert severity='info'>
            Por el momento no hay <strong>categorias con productos</strong> para mostrar.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
