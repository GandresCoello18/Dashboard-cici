/* eslint-disable react/react-in-jsx-scope */
import { Line } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

interface Props {
  fechas: string[] | undefined;
  ventas: number[] | undefined;
  comision: number[] | undefined;
}

const Sales = ({ fechas, ventas, comision }: Props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: '#fec4d2',
        data: ventas,
        label: 'Ventas',
      },
      {
        backgroundColor: colors.grey[200],
        data: comision,
        label: 'Comision',
      },
    ],
    labels: fechas,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.primary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.primary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [8],
            borderDashOffset: [2],
            color: theme.palette.primary,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.primary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card>
      <CardHeader title='Ventas de este mes' />
      <Divider />
      <CardContent>
        <Box height={400} position='relative'>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box display='flex' justifyContent='flex-end' p={2}>
        <Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
          Visión general
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
