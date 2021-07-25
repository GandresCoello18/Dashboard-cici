/* eslint-disable react/react-in-jsx-scope */
// import { Card } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { toast } from 'react-toast';
import { BASE_API_IMAGES_CLOUDINNARY, BASE_API_IMAGES_CLOUDINNARY_SCALE } from '../../../api';
import { DeleteImageProducto } from '../../../api/products';
import { SourcesProduct } from '../../../interfaces/Product';

interface Props {
  actions?: boolean;
  token: string;
  sources: SourcesProduct[];
  IdProduct: string;
  setReloadProduct: Dispatch<SetStateAction<boolean>>;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const ListImagen = ({ actions, token, sources, IdProduct, setReloadProduct }: Props) => {
  const [Loading, setLoading] = useState<boolean>(false);

  const DeleteImage = async (publicId: string) => {
    setLoading(true);

    try {
      await DeleteImageProducto({ token, publicId, IdProduct });

      setLoading(false);
      setReloadProduct(true);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Carousel responsive={responsive}>
      {!Loading ? (
        sources.map((item: SourcesProduct) => (
          <>
            <div key={item.idSourceProduct} style={{ background: '#fff', padding: 5 }}>
              {item.kind === 'IMAGEN' ? (
                <img
                  width='100%'
                  height='cover'
                  style={{ padding: 10 }}
                  src={`${BASE_API_IMAGES_CLOUDINNARY_SCALE}/${item.source}`}
                  title=''
                />
              ) : (
                <video width='100%'>
                  <source src={`${BASE_API_IMAGES_CLOUDINNARY}/${item.source}`} type='video/mp4' />
                  <source src={`${BASE_API_IMAGES_CLOUDINNARY}/${item.source}`} type='video/ogg' />
                </video>
              )}
            </div>
            {actions && (
              <div style={{ textAlign: 'center', padding: 5 }}>
                <span style={{ color: 'red' }} onClick={() => DeleteImage(item.source)}>
                  Eliminar
                </span>
              </div>
            )}
          </>
        ))
      ) : (
        <div>
          Procesando...
          <CircularProgress color='secondary' />
        </div>
      )}
    </Carousel>
  );
};
