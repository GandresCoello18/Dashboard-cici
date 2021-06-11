/* eslint-disable react/react-in-jsx-scope */
import { Avatar, Card, CardContent, Grid, Typography, makeStyles, colors } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

interface Props {
  Loading: boolean;
  Amount: number | undefined;
  ComisionAmount: number | undefined;
}

const TotalProfit = ({ Loading, Amount, ComisionAmount }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL DE INGRESOS
            </Typography>
            <Typography color='textPrimary' variant='h5'>
              {Loading ? <Skeleton variant='text' width={100} /> : `$${Amount}`}
            </Typography>

            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL DE COMISION
            </Typography>
            <Typography color='textPrimary' variant='h5'>
              {Loading ? <Skeleton variant='text' width={100} /> : `$${ComisionAmount}`}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
