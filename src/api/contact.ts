import { api } from '.';

export const GetContact = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: 'messages',
  });
  return response;
};
