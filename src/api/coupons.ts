import { api } from '.';

export const GetCoupons = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/coupons',
  });
  return response;
};

export const GetAssignCoupons = async (option: {
  token: string | undefined;
  id_user_coupon?: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${
      option.id_user_coupon
        ? `/coupons/assign?id_user_coupon=${option.id_user_coupon}`
        : '/coupons/assign'
    }`,
  });
  return response;
};

export const GetCouponsAmountByUser = async (option: {
  token: string | undefined;
  idUser: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/coupons/assign/amount/${option.idUser}`,
  });
  return response;
};
