/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, useRoutes } from 'react-router-dom';
import { NotFound } from '../view/NotFound';
import { Panel } from '../view/home';
import DashboardLayout from '../layouts/DashboardLayout';
import Cookies from 'js-cookie';
import { ThemeProvider } from '@material-ui/styles';
import GlobalStyles from '../components/GlobalStyles';
import theme from '../theme';
import { Customenrs } from '../view/customers';
import { Account } from '../view/account';
import { Products } from '../view/product';
import { Coupons } from '../view/coupons';
import { DetailsCustomenr } from '../view/detailsCustomenr';
import { DetailsProduct } from '../view/detailsProduct';
import { Ordens } from '../view/orders';

const token = Cookies.get('access-token-cici');

const PathSesion = (Componente: any) => {
  if (token === undefined) {
    return <Componente />;
  }

  return <Navigate to='/login' />;
};

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: PathSesion(Panel) },
      { path: 'customers', element: PathSesion(Customenrs) },
      { path: 'customers/:idUser', element: PathSesion(DetailsCustomenr) },
      { path: 'products', element: PathSesion(Products) },
      { path: 'products/:idProduct', element: PathSesion(DetailsProduct) },
      { path: 'coupons', element: PathSesion(Coupons) },
      { path: 'shopping', element: PathSesion(Ordens) },
      { path: 'account', element: PathSesion(Account) },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
