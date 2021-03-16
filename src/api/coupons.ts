import { api } from '.';

export const GetCoupons = async (option: { token: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/coupons',
  });
  return response;
};
