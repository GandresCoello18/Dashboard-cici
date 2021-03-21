/* eslint-disable react/react-in-jsx-scope */
import { Avatar, Card, CardContent, Grid, Typography, makeStyles, colors } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
  Amount: number | undefined;
  ComisionAmount: number | undefined;
}

const TotalProfit = ({ Amount, ComisionAmount }: Props) => {
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
              ${Amount}
            </Typography>

            <Typography color='textSecondary' gutterBottom variant='h6'>
              TOTAL DE COMISION
            </Typography>
            <Typography color='textPrimary' variant='h5'>
              ${ComisionAmount}
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
