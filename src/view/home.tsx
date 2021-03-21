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
import TrafficByDevice from '../components/Panel/TrafficByDevice';
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
  const [Loading, setLoading] = useState<boolean>(false);
  const [Statistic, setStatistic] = useState<Statistics>();

  useEffect(() => {
    setLoading(true);

    const Fetch = async () => {
      try {
        const { statistics } = await (await GetStatisticTotal({ token })).data;
        setStatistic(statistics);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    Fetch();
  }, [token]);

  return (
    <Page className={classes.root} title='Panel'>
      <Container maxWidth={undefined}>
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
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit Amount={Statistic?.Amount} ComisionAmount={Statistic?.ComisionAmount} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales
              fechas={Statistic?.grafico.fechas}
              ventas={Statistic?.grafico.ventas}
              comision={Statistic?.grafico.comision}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};
