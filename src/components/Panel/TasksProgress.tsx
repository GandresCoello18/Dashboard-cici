/* eslint-disable react/react-in-jsx-scope */
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors,
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

interface Props {
  progress: number;
}

const TasksProgress = ({ progress }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='space-between' spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              PROGRESO DE TAREAS
            </Typography>
            <Typography color='textPrimary' variant='h3'>
              {progress}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={progress} variant='determinate' />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TasksProgress;
