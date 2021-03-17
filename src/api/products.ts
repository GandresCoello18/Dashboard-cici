import { api } from '.';

export const GetProducts = async (option: { token: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/products',
  });
  return response;
};

export const GetProduct = async (option: { token: string | undefined; idProduct: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/products/${option.idProduct}`,
  });
  return response;
};

export const GetProductReview = async (option: {
  token: string | undefined;
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/products/review/${option.idProduct}`,
  });
  return response;
};
