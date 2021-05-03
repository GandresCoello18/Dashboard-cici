import { api } from '.';

export const GetCategory = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: 'category',
  });
  return response;
};

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

export const AddCategoryProduct = async (option: {
  token: string | undefined;
  categorys: number[];
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: 'category/producto',
    data: {
      categorys: option.categorys,
      idProduct: option.idProduct,
    },
  });
  return response;
};

export const DeleteCategory = async (option: { token: string | undefined; title: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `category/${option.title}`,
  });
  return response;
};

export const DeleteProductCategory = async (option: {
  token: string | undefined;
  id_product_category: number;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `category/producto/${option.id_product_category}`,
  });
  return response;
};
