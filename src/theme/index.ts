import { colors, createMuiTheme } from '@material-ui/core';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: '#fec4d2',
    },
    secondary: {
      main: '#546e7a',
    },
    text: {
      primary: '#232f3e',
      secondary: colors.blueGrey[600],
    },
  },
  typography,
});

export default theme;
