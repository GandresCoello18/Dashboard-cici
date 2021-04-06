/* eslint-disable react/react-in-jsx-scope */
// import { Card } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import { BASE_API } from '../../../api';
import { SourcesProduct } from '../../../interfaces/Product';

interface Props {
  sources: SourcesProduct[];
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

export const ListImagen = ({ sources }: Props) => {
  return (
    <Carousel responsive={responsive}>
      {sources.map((item: SourcesProduct) => (
        <div key={item.idSourceProduct} style={{ background: '#fff', padding: 5 }}>
          {item.kind === 'IMAGEN' ? (
            <img
              width='100%'
              style={{ padding: 10 }}
              src={
                item.idSourceProduct === 'generado'
                  ? `${BASE_API}/static/${item.source}`
                  : `${BASE_API}/static/more-source/${item.source}`
              }
              title=''
            />
          ) : (
            <video width='100%'>
              <source src={`${BASE_API}/static/more-source/${item.source}`} type='video/mp4' />
              <source src={`${BASE_API}/static/more-source/${item.source}`} type='video/ogg' />
            </video>
          )}
        </div>
      ))}
    </Carousel>
  );
};
