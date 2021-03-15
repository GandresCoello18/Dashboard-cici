import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

/* eslint-disable react/react-in-jsx-scope */
export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: 30 }}>
      <img src='not-found.svg' alt='Imagen 404' />
      <br />
      <Link to='/app/dashboard'>
        <Button color='secondary' variant='contained'>
          Volver a un lugar seguro
        </Button>
      </Link>
    </div>
  );
};
