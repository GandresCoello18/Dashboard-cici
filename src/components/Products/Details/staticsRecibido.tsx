/* eslint-disable react/react-in-jsx-scope */
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  /* useTheme, */
} from '@material-ui/core';
import { Received } from '../../../interfaces/Statistics';

interface Props {
  Received: Received[] | undefined;
}

const Recibidos = ({ Received }: Props) => {
  const data = {
    datasets: [
      {
        data: Received?.length ? Received.map(item => item.total) : [],
        label: 'Recibido',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
      },
    ],
    labels: Received?.length ? Received.map(item => item.received) : [],
  };

  return (
    <Card>
      <CardHeader title='Recibidos' />
      <Divider />
      <CardContent>
        <Box height={400} position='relative'>
          <Pie data={data} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Recibidos;
