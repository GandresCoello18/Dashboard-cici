import { api } from '.';
import { Contact } from '../interfaces/Contacto';

export const GetContact = async (option: { token: string | undefined }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'GET',
    url: 'messages',
  });
  return response;
};

export const DeleteContact = async (option: { token: string | undefined; idContact: string }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'DELETE',
    url: `messages/${option.idContact}`,
  });
  return response;
};

export const SendMessageContact = async (option: { token: string | undefined; data: Contact }) => {
  api.defaults.headers['access-token'] = option.token;
  const response = await api({
    method: 'POST',
    url: 'messages/answer',
    data: option.data,
  });
  return response;
};
