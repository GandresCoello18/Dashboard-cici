import { api } from '.';
import { NewShipping } from '../interfaces/Shipping';

export const CreateShipping = async (option: { token: string | undefined; data: NewShipping }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/shipping',
    data: option.data,
  });
  return response;
};
