/* eslint-disable no-undef */
import { api } from '.';

export const GetProducts = async (option: {
  token?: string;
  findProduct?: string;
  page: number;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `${
      option.findProduct
        ? `/products??page=${option.page}&findProduct=${option.findProduct}`
        : `/products?page=${option.page}`
    }`,
  });
  return response;
};

export const GetProduct = async (option: { token: string | undefined; idProduct: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/products/${option.idProduct}`,
  });
  return response;
};

export const GetSearchProduct = async (option: { token: string | undefined; key: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/products/search/${option.key}`,
  });
  return response;
};

export const GetProductReview = async (option: {
  token: string | undefined;
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: `/products/review/${option.idProduct}`,
  });
  return response;
};

export const NewProducto = async (option: { token: string | undefined; data: FormData }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/products',
    data: option.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
};

export const MoreSourcesProducto = async (option: {
  token: string | undefined;
  data: FormData;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/products/moreSources',
    data: option.data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
};

export const DeleteProducto = async (option: { token: string | undefined; IdProduct: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/products/${option.IdProduct}`,
  });
  return response;
};

export const DeleteImageProducto = async (option: {
  token: string | undefined;
  IdProduct: string;
  publicId: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/products/image/${option.IdProduct}?public_id=${option.publicId}`,
  });
  return response;
};
