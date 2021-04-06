/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Cookies from 'js-cookie';

interface Props {
  onMobileNavOpen: () => any;
}

const TopBar = ({ onMobileNavOpen, ...rest }: Props) => {
  const navigate = useNavigate();

  const closeSesion = () => {
    Cookies.remove('access-token-cici');
    navigate('/login');
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to='/app/dashboard'>
          <img
            src='https://res.cloudinary.com/cici/image/upload/v1617738023/util/logo-cici_trmlbe.jpg'
            alt='logo de cici'
            width={60}
            style={{ borderRadius: 15, border: '1px solid #fff' }}
          />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color='inherit' onClick={closeSesion}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
