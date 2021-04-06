/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import {
  Avatar,
  Box,
  Button,
  Grid,
  Card,
  CircularProgress,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useContext, useState } from 'react';
import { MeContext } from '../../context/contextMe';
import { DialogoForm } from '../DialogoForm';
import { UploadImage } from '../UploadImage';
import { ImageListType } from 'react-images-uploading';
import { toast } from 'react-toast';
import { UpdateAvatarUser } from '../../api/users';
import { SourceAvatar } from '../../helpers/sourceAvatar';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const { me, token } = useContext(MeContext);
  const [Visible, setVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageListType>([]);

  const onChange = (imageList: ImageListType) => setImages(imageList as never[]);

  const UploadAvatar = async () => {
    setLoading(true);

    const data = new FormData();
    data.append('avatar', images[0].file || '');

    try {
      await UpdateAvatarUser({ token, data });
      toast.success('Foto de perfil actualizado');

      setVisible(false);
      setLoading(false);

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box alignItems='center' display='flex' flexDirection='column'>
            <Avatar className={classes.avatar} src={SourceAvatar(me.avatar)} />
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
          <Button color='secondary' fullWidth variant='contained' onClick={() => setVisible(true)}>
            Cambiar Foto
          </Button>
        </CardActions>
      </Card>

      <DialogoForm Open={Visible} setOpen={setVisible} title='Cambiar foto de perfil'>
        {Loading ? (
          <CircularProgress color='secondary' />
        ) : (
          <>
            <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
              <Grid item>
                <UploadImage images={images} maxNumber={1} onChange={onChange} />
              </Grid>
            </Grid>
            <br />
            {images.length ? (
              <Button
                color='primary'
                disabled={Loading}
                fullWidth
                variant='contained'
                onClick={UploadAvatar}
              >
                Subir foto de perfil
              </Button>
            ) : (
              ''
            )}
          </>
        )}
      </DialogoForm>
    </>
  );
};
