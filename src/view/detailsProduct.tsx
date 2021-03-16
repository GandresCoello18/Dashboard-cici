/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import {
  Container,
  makeStyles,
  // CardHeader,
  // Grid,
  Card,
  // Box,
  // Divider,
  CardContent,
} from '@material-ui/core';
import Page from '../components/page';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export const DetailsProduct = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='Detalles'>
      <Container maxWidth='xl'>
        <Card>
          <CardContent>efefefe</CardContent>
        </Card>
      </Container>
    </Page>
  );
};
