import { api } from '.';

export const GetStatisticTotal = async (option: {
  token: string | undefined;
  dateFetch?: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/statistics?mesAno=${option.dateFetch}`,
  });
  return response;
};

export const GetStatisticProduct = async (option: {
  token: string | undefined;
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/statistics/ReviewProduct/${option.idProduct}`,
  });
  return response;
};
