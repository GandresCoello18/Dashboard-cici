/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../components/page';
import Budget from '../components/Panel/Budget';
import Sales from '../components/Panel/Sales';
import TasksProgress from '../components/Panel/TasksProgress';
import TotalCustomers from '../components/Panel/TotalCustomers';
import TotalProfit from '../components/Panel/TotalProfit';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toast';
import { GetStatisticTotal } from '../api/statistic';
import { MeContext } from '../context/contextMe';
import { Statistics } from '../interfaces/Statistics';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const Panel = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [dateFetch, setDateFetch] = useState<string>('');
  const [Loading, setLoading] = useState<boolean>(false);
  const [Statistic, setStatistic] = useState<Statistics>();

  const Fetch = async () => {
    setLoading(true);

    try {
      const { statistics } = await (await GetStatisticTotal({ token, dateFetch })).data;
      setStatistic(statistics);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    token && Fetch();
  }, [token]);

  useEffect(() => {
    dateFetch && Fetch();
  }, [dateFetch]);

  return (
    <Page className={classes.root} title='Panel'>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget
              order={Statistic?.order.order}
              totalOrders={Statistic?.order.totalOrders}
              lasTotalOrders={Statistic?.order.totalLasOrders}
              Loading={Loading}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers
              user={Statistic?.user.user}
              totalUser={Statistic?.user.totalLasUser}
              lasTotalUser={Statistic?.user.totalLasUser}
              Loading={Loading}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress progress={Statistic?.task.progress || 0} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit
              Loading={Loading}
              Amount={Statistic?.Amount}
              ComisionAmount={Statistic?.ComisionAmount}
            />
          </Grid>
          <Grid item xs={12}>
            <Sales
              fechas={Statistic?.grafico.fechas}
              ventas={Statistic?.grafico.ventas}
              comision={Statistic?.grafico.comision}
              setDateFetch={setDateFetch}
              Loading={Loading}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
