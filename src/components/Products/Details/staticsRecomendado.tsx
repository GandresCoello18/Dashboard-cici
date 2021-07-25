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
import { Recommendation } from '../../../interfaces/Statistics';

interface Props {
  Recommendation: Recommendation[] | undefined;
}

const Recomendado = ({ Recommendation }: Props) => {
  const data = {
    datasets: [
      {
        data: Recommendation?.length ? Recommendation.map(item => item.total) : [],
        label: 'Recomendado',
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      },
    ],
    labels: Recommendation?.length ? Recommendation.map(item => item.recommendation) : [],
  };

  return (
    <Card>
      <CardHeader title='Recomendado' />
      <Divider />
      <CardContent>
        <Box height={400} position='relative'>
          <Pie
            data={data}
            options={{
              title: {
                display: true,
                text: !Recommendation?.length && 'No hay datos',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Recomendado;
