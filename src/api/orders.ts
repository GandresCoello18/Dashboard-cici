import { api } from '.';

export const GetOrdens = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/orden',
  });
  return response;
};
