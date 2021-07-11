import { api } from '.';

export const NewLottery = async (option: { token?: string; finishAt: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/lottery',
    data: {
      finishAt: option.finishAt,
    },
  });
  return response;
};

export const GetLotterys = async (option: { token?: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/lottery',
  });
  return response;
};
