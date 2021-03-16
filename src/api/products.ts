import { api } from '.';

export const GetProducts = async (option: { token: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/products',
  });
  return response;
};
