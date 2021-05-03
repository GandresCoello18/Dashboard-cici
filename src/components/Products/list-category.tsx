/* eslint-disable react/react-in-jsx-scope */
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Button,
  ListItemText,
  Chip,
  makeStyles,
} from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import { CategoryCountProduct } from '../../interfaces/Category';
import DeleteIcon from '@material-ui/icons/Delete';
import { DialogoMessage } from '../DialogoMessage';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toast';
import { MeContext } from '../../context/contextMe';
import { DeleteCategory } from '../../api/category';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  btnDelete: {
    backgroundColor: '#f8d7da',
    marginRight: 15,
  },
}));

interface Props {
  CategoryCountProduct: CategoryCountProduct[];
  setReloadCategory: Dispatch<SetStateAction<boolean>>;
}

export const ListCategory = ({ CategoryCountProduct, setReloadCategory }: Props) => {
  const { token } = useContext(MeContext);
  const classes = useStyles();
  const [VisibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [AceptDialog, setAceptDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const FetchDelete = async () => {
      setLoading(true);

      try {
        await DeleteCategory({ token, title });
        setLoading(false);

        setReloadCategory(true);
        setTitle('');
        setVisibleDialog(false);
        toast.success('Categoria eliminada');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (AceptDialog) {
      FetchDelete();
      setVisibleDialog(true);
    }
  }, [AceptDialog, token, title, setReloadCategory]);

  const SkeletonCategory = () => {
    return [0, 1, 2, 3, 4].map(item => (
      <Skeleton key={item} style={{ marginBottom: 5 }} variant='rect' width='90%' height={30} />
    ));
  };

  return (
    <>
      <Card>
        <CardHeader title='Categorias / Total productos' />
        <Divider />
        <CardContent className={classes.root}>
          {!Loading &&
            CategoryCountProduct.map(item => (
              <>
                <Box display='flex' key={item.titleCategory}>
                  <Button
                    variant='contained'
                    className={classes.btnDelete}
                    onClick={() => {
                      setTitle(item.titleCategory);
                      setVisibleDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <ListItemText primary={item.titleCategory} />
                  <Chip label={item.productos} color='secondary' />
                </Box>
                <Divider />
              </>
            ))}

          {Loading && SkeletonCategory()}

          {!Loading && CategoryCountProduct.length === 0 && (
            <Alert severity='info'>
              Por el momento no hay <strong>categorias con productos</strong> para mostrar.
            </Alert>
          )}
        </CardContent>
      </Card>

      <DialogoMessage
        title='Aviso importante'
        Open={VisibleDialog}
        setOpen={setVisibleDialog}
        setAceptDialog={setAceptDialog}
        content='¿Esta seguro que deseas eliminar este registro?, una vez hecho sera irrecuperable.'
      />
    </>
  );
};
