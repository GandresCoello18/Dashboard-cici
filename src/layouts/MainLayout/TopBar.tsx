/* eslint-disable react/react-in-jsx-scope */
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
});

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <RouterLink to='/'>
          <img
            src='../logo-cici.jpg'
            alt='logo de cici'
            width={60}
            style={{ borderRadius: 15, border: '1px solid #fff' }}
          />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
