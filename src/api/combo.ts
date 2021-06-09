import { api } from '.';
import { NewCombo } from '../interfaces/Combo';

export const CreateCombo = async (option: { token: string | undefined; data: NewCombo }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/combo',
    data: option.data,
  });
  return response;
};

export const AddProductCombo = async (option: {
  token: string | undefined;
  idProduct: string;
  idCombo: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: '/combo/addProduct',
    data: {
      idCombo: option.idCombo,
      idProduct: option.idProduct,
    },
  });
  return response;
};

export const GetCombos = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: '/combo/all',
  });
  return response;
};

export const UpdateCombo = async (option: { token: string | undefined; combo: NewCombo }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'PUT',
    url: `/combo/${option.combo.idCombo}`,
    data: {
      ...option.combo,
    },
  });
  return response;
};

export const DeleteProductCombo = async (option: {
  token: string | undefined;
  idProduct: string;
}) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/combo/product/${option.idProduct}`,
  });
  return response;
};

export const DeleteCombo = async (option: { token: string | undefined; idCombo: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `/combo/${option.idCombo}`,
  });
  return response;
};
