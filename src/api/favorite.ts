import { api } from '.';

export const GetFavoriteByUser = async (option: { token: string | undefined; idUser: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/favorite/user/${option.idUser}`,
  });
  return response;
};
