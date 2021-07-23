/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { api } from '.';
import { NewShipping } from '../interfaces/Shipping';

export const CreateShipping = async (option: { token?: string; data: NewShipping }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/shipping',
    data: option.data,
  });
  return response;
};

export const GetShipping = async (option: {
  token: string | undefined;
  idPago?: string;
  page: number;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${
      option.idPago
        ? `/shipping?idPago=${option.idPago}&page=${option.page}`
        : `/shipping?page=${option.page}`
    }`,
  });
  return response;
};

export const UpdateStatusShipping = async (option: {
  token: string | undefined;
  status: string;
  idShipping: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'PUT',
    url: `/shipping/status/${option.idShipping}`,
    data: {
      status: option.status,
    },
  });
  return response;
};
