import { api } from '.';

export const GetAddressByUser = async (option: { token: string | undefined; idUser: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/addresses/${option.idUser}`,
  });
  return response;
};
