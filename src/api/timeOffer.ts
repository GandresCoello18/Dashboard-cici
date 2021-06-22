import { api } from '.';
import { OfferTime } from '../interfaces/TimeOffer';

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

export const AddProductTimeOffer = async (option: {
  token: string | undefined;
  data: {
    idProduct: string;
    idOfferTime: string;
  };
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/offerTime/product',
    data: option.data,
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

export const EditTimeOffer = async (option: { token: string | undefined; update: OfferTime }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'PUT',
    url: '/offerTime',
    data: option.update,
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

export const DeleteProductTimeOffer = async (option: {
  token: string | undefined;
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/offerTime/product/${option.idProduct}`,
  });
  return response;
};
