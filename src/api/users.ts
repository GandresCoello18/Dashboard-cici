import { api } from '.';

export const GetUsers = async (option: { token: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/users',
  });
  return response;
};
