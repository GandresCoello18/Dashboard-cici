import { api } from '.';
import { NewCombos } from '../interfaces/Combo';

export const NewCombo = async (option: { token: string | undefined; data: NewCombos }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/combo',
    data: option.data,
  });
  return response;
};

export const GetCombos = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/combo/all',
  });
  return response;
};
