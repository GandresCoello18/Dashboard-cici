import { api } from '.';

export const GetUsers = async (option: { token: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/users',
  });
  return response;
};

export const GetUser = async (option: { token: string | undefined; idUser: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/users/${option.idUser}`,
  });
  return response;
};
