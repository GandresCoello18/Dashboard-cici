import { api } from '.';

export const GetStatisticTotal = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/statistics',
  });
  return response;
};
