/* eslint-disable react-hooks/exhaustive-deps */
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
  Button,
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
import Pagination from '@material-ui/lab/Pagination';
import { TableCouponUser } from '../components/Coupons/tableCouponUser';
import { DialogoForm } from '../components/DialogoForm';
import { NewCoupons } from '../components/Coupons/new-coupons';
import { AxiosError } from 'axios';
import { HandleError } from '../helpers/handleError';

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
  const [Count, setCount] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [ReloadCoupon, setReloadCoupon] = useState<boolean>(false);
  const [SearchCoupon, setSearchCoupon] = useState<string>('');
  const [FetchCoupons, setFetchCoupons] = useState<Coupon[]>([]);
  const [FetchAssingCoupons, setFetchAssingCoupons] = useState<CouponsAssing[]>([]);

  const Fetch = async (page: number) => {
    setLoading(true);

    try {
      const { coupons } = await (await GetCoupons({ token })).data;
      setFetchCoupons(coupons);

      const { CouponsAssing, pages } = await (
        await GetAssignCoupons({ token, id_user_coupon: SearchCoupon || undefined, page })
      ).data;

      setCount(pages);
      setFetchAssingCoupons(CouponsAssing);

      setLoading(false);
    } catch (error) {
      toast.error(HandleError(error as AxiosError));
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch(1);

    if (ReloadCoupon) {
      setReloadCoupon(false);
    }
  }, [token, SearchCoupon, ReloadCoupon]);

  const SelectItemPagination = (page: number) => Fetch(page);

  return (
    <Page className={classes.root} title='Cupones'>
      <Container maxWidth={undefined}>
        <Box display='flex' justifyContent='flex-end'>
          <Button color='secondary' variant='contained' onClick={() => setVisible(true)}>
            Nuevo cupon
          </Button>
        </Box>
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
              <CardCoupons
                Loading={Loading}
                setLoading={setLoading}
                setReloadCoupon={setReloadCoupon}
                Coupons={FetchCoupons}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box mt={3}>
          <TableCouponUser Coupons={FetchAssingCoupons} Loading={Loading} />
        </Box>
        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination
            count={Count}
            color='secondary'
            onChange={(event, page) => SelectItemPagination(page)}
          />
        </Box>
      </Container>

      <DialogoForm Open={visible} setOpen={setVisible} title='Nuevo Cupon'>
        <NewCoupons setReloadCoupon={setReloadCoupon} />
      </DialogoForm>
    </Page>
  );
};
