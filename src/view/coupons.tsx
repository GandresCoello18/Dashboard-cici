/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import {
  Container,
  makeStyles,
  Box,
  CardContent,
  Card,
  SvgIcon,
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Page from '../components/page';
import SearchIcon from '@material-ui/icons/Search';
import { toast } from 'react-toast';
import { Coupon, CouponsAssing } from '../interfaces/Coupon';
import { MeContext } from '../context/contextMe';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GetAssignCoupons, GetCoupons } from '../api/coupons';
import { CardCoupons } from '../components/Coupons/cardsCupons';
import { TableCouponUser } from '../components/Coupons/tableCouponUser';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: '#f2f2f2',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  space: {
    marginLeft: 10,
  },
}));

export const Coupons = () => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Loading, setLoading] = useState<boolean>(false);
  const [SearchCoupon, setSearchCoupon] = useState<string>('');
  const [FetchCoupons, setFetchCoupons] = useState<Coupon[]>([]);
  const [FetchAssingCoupons, setFetchAssingCoupons] = useState<CouponsAssing[]>([]);

  useEffect(() => {
    setLoading(true);

    const Fetch = async () => {
      try {
        const { coupons } = await (await GetCoupons({ token })).data;
        setFetchCoupons(coupons);

        const { CouponsAssing } = await (
          await GetAssignCoupons({ token, id_user_coupon: SearchCoupon || undefined })
        ).data;
        setFetchAssingCoupons(CouponsAssing);

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    Fetch();
  }, [token, SearchCoupon]);

  return (
    <Page className={classes.root} title='Cupones'>
      <Container maxWidth={undefined}>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500} display='flex'>
                <TextField
                  fullWidth
                  onChange={event => setSearchCoupon(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SvgIcon fontSize='small' color='action'>
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder='Buscar cupon por ID'
                  variant='outlined'
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>Nuestros Cupones</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CardCoupons Loading={Loading} Coupons={FetchCoupons} />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={3}>
          <TableCouponUser Coupons={FetchAssingCoupons} Loading={Loading} />
        </Box>
      </Container>
    </Page>
  );
};
