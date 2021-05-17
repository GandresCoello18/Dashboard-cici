/* eslint-disable no-undef */
import { api } from '.';

export const GetCoupons = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/coupons/all',
  });
  return response;
};

export const GetAssignCoupons = async (option: {
  token: string | undefined;
  id_user_coupon?: string;
  page: number;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${
      option.id_user_coupon
        ? `/coupons/assign?id_user_coupon=${option.id_user_coupon}&page=${option.page}`
        : `/coupons/assign?page=${option.page}`
    }`,
  });
  return response;
};

export const NewCoupon = async (option: { token: string | undefined; data: FormData }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/coupons',
    data: option.data,
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

export const DeleteCoupon = async (option: { token: string | undefined; idCoupon: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/coupons/${option.idCoupon}`,
  });
  return response;
};
