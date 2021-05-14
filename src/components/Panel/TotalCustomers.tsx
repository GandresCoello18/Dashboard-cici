/* eslint-disable react/react-in-jsx-scope */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceNegativeIcon: {
    color: colors.red[900],
  },
  differencePositiveIcon: {
    color: colors.green[900],
  },
  differencePositiveValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
  differenceNegativeValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  user: number | undefined;
  totalUser: number | undefined;
  lasTotalUser: number | undefined;
  Loading: boolean;
}

const TotalCustomers = ({ user, totalUser, lasTotalUser, Loading }: Props) => {
  const classes = useStyles();
  const [Result, setResult] = useState<number>(0);
  const [Actual, setActual] = useState<number>(0);
  const [Anterior, setAnterior] = useState<number>(0);

  useEffect(() => {
    if (totalUser && lasTotalUser) {
      setActual(totalUser);
      setAnterior(lasTotalUser);
      setResult((totalUser * lasTotalUser) / 100);
    }
  }, [totalUser, lasTotalUser]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL DE CLIENTES
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {Loading ? <Skeleton variant='text' width={100} /> : user}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display='flex' alignItems='center'>
          {Anterior > Actual ? (
            <ArrowDownwardIcon className={classes.differenceNegativeIcon} />
          ) : (
            <ArrowUpwardIcon className={classes.differencePositiveIcon} />
          )}
          <Typography
            className={
              Anterior > Actual ? classes.differenceNegativeValue : classes.differencePositiveValue
            }
            variant='body2'
          >
            {Loading ? <Skeleton variant='text' width={100} /> : Result}%
          </Typography>
          <Typography color='textSecondary' variant='caption'>
            Desde el mes pasado
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalCustomers;
