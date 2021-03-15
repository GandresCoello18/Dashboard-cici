/* eslint-disable no-undef */
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import NavItem from './NavItem';

interface Props {
  onMobileClose: () => any
  openMobile: boolean
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  navItem: {}
}));

const NavBar = ({ onMobileClose, openMobile }: Props) => {
  const classes = useStyles();
  const location = useLocation();

  let items = [
    {
      href: '/app/dashboard',
      icon: AcUnitIcon,
      title: 'Panel'
    },
    {
      href: '/app/customers',
      icon: AcUnitIcon,
      title: 'Clientes'
    },
    {
      href: '/app/products',
      icon: AcUnitIcon,
      title: 'Productos'
    },

    {
      href: '/app/pacient',
      icon: AcUnitIcon,
      title: 'Mascotas'
    },
    {
      href: '/app/calendario',
      icon: AcUnitIcon,
      title: 'Calendarios'
    },
    {
      href: '/app/account',
      icon: AcUnitIcon,
      title: 'Mi cuenta'
    },
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src=""
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          Anonimo
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          anonimo@gmail.com
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              className={classes.navItem}
            />
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
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
