import { api } from '.';

export const GetProductCart = async (option: { token?: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/cart',
  });
  return response;
};

export const DeleteProductCart = async (option: { token?: string; idProduct: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/cart/${option.idProduct}`,
  });
  return response;
};
