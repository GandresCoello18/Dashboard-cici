import { api } from '.';

export const GetCategoryProduct = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: 'category/productos',
  });
  return response;
};

export const CreateCategory = async (option: { token: string | undefined; title: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: 'category',
    data: {
      title: option.title,
    },
  });
  return response;
};
