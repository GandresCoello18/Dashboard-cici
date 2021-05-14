/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
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

interface NewUsers {
  email: string;
  userName: string;
  password: string;
  provider: string;
}

export const GetUsers = async (option: {
  token: string | undefined;
  findUser?: string;
  page: number;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${
      option.findUser
        ? `/users?findUser=${option.findUser}&page=${option.page}`
        : `/users?page=${option.page}`
    }`,
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

export const NewUser = async (options: { data: NewUsers }) => {
  const response = await api({
    method: 'POST',
    url: '/users',
    data: options.data,
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

export const UpdateAvatarUser = async (options: { token: string | undefined; data: FormData }) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'PUT',
    url: '/users/avatar',
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

export const UpdatePasswordEmail = async (options: {
  token: string | undefined;
  newKey: string;
  email: string;
}) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'PUT',
    url: `/reset-password/${options.email}`,
    data: {
      newKey: options.newKey,
    },
  });
  return response;
};

export const DeleteUser = async (options: { token: string | undefined; IdUser: string }) => {
  api.defaults.headers['access-token'] = options.token;
  const response = await api({
    method: 'DELETE',
    url: `/users/${options.IdUser}`,
  });
  return response;
};
