/* eslint-disable @typescript-eslint/no-var-requires */
import { api } from '.';

const BASE_API_PAYPAL = 'https://api-m.sandbox.paypal.com/v2';

export const GetPayment = async (options: { idPayment: string }) => {
  const response = await api({
    method: 'GET',
    url: `${BASE_API_PAYPAL}/payments/captures/${options.idPayment}`,
    auth: {
      username: `${process.env.REACT_APP_CLIENT_ID_PAYPAL}`,
      password: `${process.env.REACT_APP_SECRET_ID_PAYPAL}`,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return response;
};

export const GetOrdenPayment = async (options: { idOrden: string }) => {
  const response = await api({
    method: 'GET',
    url: `${BASE_API_PAYPAL}/checkout/orders/${options.idOrden}`,
    auth: {
      username: `${process.env.REACT_APP_CLIENT_ID_PAYPAL}`,
      password: `${process.env.REACT_APP_SECRET_ID_PAYPAL}`,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return response;
};

export const RefundPayment = async (options: { idPayment: string }) => {
  const response = await api({
    method: 'POST',
    url: `${BASE_API_PAYPAL}/payments/captures/${options.idPayment}/refund`,
    auth: {
      username: `${process.env.REACT_APP_CLIENT_ID_PAYPAL}`,
      password: `${process.env.REACT_APP_SECRET_ID_PAYPAL}`,
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return response;
};
