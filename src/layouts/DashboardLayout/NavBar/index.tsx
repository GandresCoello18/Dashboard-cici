/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import NavItem from './NavItem';

interface Props {
  onMobileClose: () => any;
  openMobile: boolean;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  navItem: {},
}));

const NavBar = ({ onMobileClose, openMobile }: Props) => {
  const classes = useStyles();

  const items = [
    {
      href: '/app/dashboard',
      icon: EqualizerIcon,
      title: 'Panel',
    },
    {
      href: '/app/customers',
      icon: PeopleIcon,
      title: 'Clientes',
    },
    {
      href: '/app/products',
      icon: AcUnitIcon,
      title: 'Productos',
    },
    {
      href: '/app/coupons',
      icon: CardMembershipIcon,
      title: 'Cupones',
    },
    {
      href: '/app/shopping',
      icon: ShoppingCartIcon,
      title: 'Compras',
    },
    {
      href: '/app/envios',
      icon: LocalShippingIcon,
      title: 'Envios',
    },
    {
      href: '/app/account',
      icon: PersonIcon,
      title: 'Mi cuenta',
    },
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = (
    <Box height='100%' display='flex' flexDirection='column'>
      <Box alignItems='center' display='flex' flexDirection='column' p={2}>
        <Avatar className={classes.avatar} component={RouterLink} src='' to='/app/account' />
        <Typography color='textPrimary' variant='h5'>
          Anonimo
        </Typography>
        <Typography color='textSecondary' variant='body2'>
          anonimo@gmail.com
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item: any) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor='left' classes={{ paper: classes.desktopDrawer }} open variant='persistent'>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
