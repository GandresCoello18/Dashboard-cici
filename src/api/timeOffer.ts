import { api } from '.';

export const GetTimesOffer = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/offerTime/all',
  });
  return response;
};
