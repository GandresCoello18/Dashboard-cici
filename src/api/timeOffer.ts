import { api } from '.';

export const CreateTimeOffer = async (option: {
  token: string | undefined;
  data: {
    finishAt: string;
    description: string;
  };
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/offerTime',
    data: {
      ...option.data,
    },
  });
  return response;
};

export const GetTimesOffer = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/offerTime/all',
  });
  return response;
};

export const DeleteTimeOffer = async (option: {
  token: string | undefined;
  idTimeOffer: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/offerTime/${option.idTimeOffer}`,
  });
  return response;
};
