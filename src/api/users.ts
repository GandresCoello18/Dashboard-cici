import { api } from '.';

interface LoginUser {
  email: string;
  password: string;
  provider: string;
}

export interface UpdateMeUser {
  email: string;
  userName: string;
  phone: number;
}

export const GetUsers = async (option: { token: string | undefined; findUser?: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${option.findUser ? `/users?findUser=${option.findUser}` : '/users'}`,
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

export const UpdateUser = async (options: { token: string | undefined; data: UpdateMeUser }) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'PUT',
    url: '/users',
    data: options.data,
  });
  return response;
};

export const UpdatePasswordUser = async (options: {
  token: string | undefined;
  currentKey: string;
  newKey: string;
}) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'PUT',
    url: '/users/password',
    data: {
      newKey: options.newKey,
      currentKey: options.currentKey,
    },
  });
  return response;
};
