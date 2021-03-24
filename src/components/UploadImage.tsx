/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button } from '@material-ui/core';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface Props {
  images: ImageListType;
  maxNumber: number;
  onChange: (imageList: ImageListType, addUpdateIndex: number[] | undefined) => void;
}

export const UploadImage = ({ images, maxNumber, onChange }: Props) => {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey='data_url'
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className='upload__image-wrapper'>
          {imageList.length === maxNumber ? (
            ''
          ) : (
            <Button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
              color='secondary'
              variant='contained'
            >
              Subir imagen
            </Button>
          )}
          &nbsp;
          {imageList.length > 1 ? (
            <Button style={{ color: 'red' }} onClick={onImageRemoveAll}>
              Limpiar
            </Button>
          ) : (
            ''
          )}
          <>
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img src={image['data_url']} alt='uj' width='100' />
                <div className='image-item__btn-wrapper'>
                  <Button
                    onClick={() => onImageUpdate(index)}
                    variant='contained'
                    color='secondary'
                  >
                    Cambiar
                  </Button>
                  <Button style={{ color: 'red' }} onClick={() => onImageRemove(index)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </>
        </div>
      )}
    </ImageUploading>
  );
};
