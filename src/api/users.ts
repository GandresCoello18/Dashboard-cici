import { api } from '.';

interface LoginUser {
  email: string;
  password: string;
  provider: string;
}

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

export const LoginAccess = async (option: { token: string | undefined; data: LoginUser }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/users/login',
    data: option.data,
  });
  return response;
};

export const GetMeUser = async (options: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'GET',
    url: '/users/me',
  });
  return response;
};
