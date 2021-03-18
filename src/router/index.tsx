/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, useRoutes } from 'react-router-dom';
import { NotFound } from '../view/NotFound';
import { Panel } from '../view/home';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
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
import { Auth } from '../view/auth';
import { useContext, useEffect } from 'react';
import { GetMeUser } from '../api/users';
import { MeContext } from '../context/contextMe';
import { toast } from 'react-toast';

const token = Cookies.get('access-token-cici');

const PathSesion = (Componente: any) => {
  return token ? <Componente /> : <Navigate to='/login' />;
};

const NotPathSesion = (Componente: any) => {
  return token ? <Navigate to='/app/dashboard' /> : <Componente />;
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
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/login', element: NotPathSesion(Auth) },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const App = () => {
  const routing = useRoutes(routes);
  const { token, setMe } = useContext(MeContext);

  useEffect(() => {
    try {
      const FetchMe = async () => {
        const { me } = await (await GetMeUser({ token })).data;
        setMe(me);
      };

      token && FetchMe();
    } catch (error) {
      toast.error(error.message);
    }
  }, [token, setMe]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
