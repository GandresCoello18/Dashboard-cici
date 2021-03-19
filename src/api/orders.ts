import { api } from '.';

export const GetOrdens = async (option: { token: string | undefined; idPago?: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${option.idPago ? `/orden?idPago=${option.idPago}` : '/orden'}`,
  });
  return response;
};

export const GetOrdensByUser = async (option: { token: string | undefined; idUser: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/orden/user/${option.idUser}`,
  });
  return response;
};
