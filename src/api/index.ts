import * as axios from 'axios';

export const DEFAULT_AVATAR = 'avatar-default.svg';
export const BASE_API_IMAGES_CLOUDINNARY =
  'http://res.cloudinary.com/cici/image/upload/v1616791874';
export const BASE_API_IMAGES_CLOUDINNARY_SCALE =
  'https://res.cloudinary.com/cici/image/upload/c_scale,w_230/v1619715476';
// const apiDev = 'http://localhost:9000';
const apiProd = 'https://api.cici.beauty';

export const BASE_API = apiProd;

export const api = axios.default.create({
  baseURL: `${BASE_API}/api`,
});

api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
