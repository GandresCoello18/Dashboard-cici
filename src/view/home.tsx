import '../App.css';
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../components/page'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Container maxWidth={undefined}>
        ferfe
      </Container>
    </Page>
  );
}
